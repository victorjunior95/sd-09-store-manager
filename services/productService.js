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
  let allProducts = await ProductModel.getAll();
  return { 'products': allProducts };
}

const getById = async (id) => {

}


module.exports = {
  create,
  getAll,
};
