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

const create = async (sale) => {
  const saleValidation = await sale.map(validateProductSale);
  const productNotExist = saleValidation.some(({ productNotFound }) => productNotFound);
  const outOfStock = saleValidation.some(
    ({ insufficientQuantity }) => insufficientQuantity
  );

  if (productNotExist) return errorObject('product_not_found', 'Product not found');
  if (outOfStock) return errorObject(
    'stock_problem',
    'Such amount is not permitted to sell',
  );
  
  const { ops: [createdSale] } = await SalesModel.create(sale);

  sale.forEach(async (product) => {
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

// const remove = async (id) => {
//   const removedProduct = await getById(id);
//   await ProductsModel.remove(id);
//   return removedProduct;
// };

// const update = async (id, name, quantity) => {
//   await ProductsModel.update(id, name, quantity);
//   const updatedProduct = await getById(id);
//   return updatedProduct;
// };

module.exports = {
  create,
  getAll,
  getById,
  // remove,
  // update,
};
