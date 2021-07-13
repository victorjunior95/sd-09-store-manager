const { ObjectId } = require('mongodb');
const ProductsModel = require('../models/ProductsModel');
const SalesModel = require('../models/SalesModel');
const ProductsServices = require('./ProductsServices');
const errorObject = require('../utils/errorObject');

const MIN_QUANTITY_ALLOWED = 0;

const validateProductSale = async (product) => {
  const productFound = await ProductsServices.getById(product.productId);
  const productNotFound = !productFound;
  const insufficientQuantity = (
    (productFound.quantity - product.quantity) < MIN_QUANTITY_ALLOWED
  );
  return { productNotFound, insufficientQuantity };
};

const create = async (itensSold) => {
  const saleValidation = await Promise.all(itensSold.map(validateProductSale));
  const productNotExist = saleValidation.some(({ productNotFound }) => productNotFound);
  const outOfStock = saleValidation.some(
    ({ insufficientQuantity }) => insufficientQuantity
  );

  if (productNotExist) return errorObject('product_not_found', 'Product not found');
  if (outOfStock) return errorObject(
    'stock_problem',
    'Such amount is not permitted to sell',
  );
  
  const { ops: [createdSale] } = await SalesModel.create(itensSold);

  itensSold.forEach(async (product) => {
    const { _id, name, quantity } = await ProductsServices.getById(product.productId);
    await ProductsModel.update(_id, name, quantity - product.quantity);
  });

  return createdSale;
};

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return { sales };
};

const getById = async (id) => SalesModel.findByQuery(ObjectId(id));

const remove = async (id) => {
  const removedSale = await getById(id);
  await SalesModel.remove(id);
  removedSale.itensSold.forEach(async (product) => {
    const { _id, name, quantity } = await ProductsServices.getById(product.productId);
    await ProductsModel.update(_id, name, quantity + product.quantity);
  });
  return removedSale;
};

const update = async (id, itensSold) => {
  await SalesModel.update(id, itensSold);
  const updatedSale = await getById(id);
  return updatedSale;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
