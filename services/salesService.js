const SalesModel = require('../models/salesModel');
const ProductModel = require('../models/productModel');

const updateProductQuantity = async (id, quantity, action) => {
  const MIN_VALUE = 0;
  const product = await ProductModel.findById(id);
  let newQuantity;

  if (action === 'delete') {
    newQuantity = product.quantity + quantity;
  } else {
    newQuantity = product.quantity - quantity;
  }

  if (newQuantity < MIN_VALUE) return true;

  await ProductModel.updateById(id, { name: product.name, quantity: newQuantity });

  return false;
};

const create = async (data) => {
  const promiseArray = data
    .map(async ({productId, quantity}) => {
      const response = await updateProductQuantity(productId, quantity, 'create');
      return response;
    });
  const containNegative = await Promise.all(promiseArray);

  if (containNegative.includes(true)) return {
    err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' }
  };

  const sale = await SalesModel.create(data);

  return sale;
};

const getAll = async () => {
  const sales = await SalesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const sale  = await SalesModel.findById(id);

  return sale
    ? sale
    : { err: { code: 'not_found', message: 'Sale not found' } };
};

const updateById = async (id, { productId, quantity }) => {
  await updateProductQuantity(productId, quantity, 'update');

  const sale = await SalesModel.updateById(id, { productId, quantity });

  return sale;
};

const deleteById = async (id) => {
  const response = await SalesModel.findById(id);

  if (response) {
    const { itensSold } = response;
    await itensSold
      .forEach(
        async ({ productId, quantity }) => (
          await updateProductQuantity(productId, quantity, 'delete')
        )
      );
  }

  const sale = await SalesModel.deleteById(id);

  return sale
    ? sale
    : { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
