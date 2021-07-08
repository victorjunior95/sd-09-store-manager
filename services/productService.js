const ProductModel = require('../models/productModel');

const create = async ({ name, quantity }) => {
  const product = await ProductModel.create({ name, quantity });

  if (product) return product;

  return { err: { code: 'invalid_data', message: 'Product already exists' } };
};

const getAll = async () => {
  const products = await ProductModel.getAll();

  return { products };
};

const findById = async (id) => {
  const product = await ProductModel.findById(id);

  return product
    ? product
    : { err: { code: 'invalid_data', message: 'Wrong id format' } };
};

const updateById = async (id, { name, quantity }) => {
  const product = await ProductModel.updateById(id, { name, quantity });

  return product;
};

const deleteById = async (id) => {
  const product = await ProductModel.deleteById(id);

  return product
    ? product
    : { err: { code: 'invalid_data', message: 'Wrong id format' } };
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
