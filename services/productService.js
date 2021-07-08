const ProductModel = require('../models/ProductModel');
const { createValidator } = require('./validators');

const create = async (name, quantity) => {
  const allProducts = await ProductModel.getAll();

  if (await createValidator(allProducts, name, quantity))
    return createValidator(allProducts, name, quantity);

  const newProduct = await ProductModel.create(name, quantity);
  return newProduct;
};

const getAll = async () => {
  const allProducts = await ProductModel.getAll();
  return { 'products': allProducts };
}

const getById = async (id) => {
  const product = await ProductModel.getById(id);
  console.log('linha 21 getById =========', product);
  if (!product) return { err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  } };
  return product;
}


module.exports = {
  create,
  getAll,
  getById,
};
