const ProductModel = require('../models/ProductModel');
const { createValidator } = require('./validators');

const create = async (name, quantity) => {
  const allProducts = await ProductModel.getAll();

  if (await createValidator(allProducts, name, quantity))
    return createValidator(allProducts, name, quantity);

  const newProduct = await ProductModel.create(name, quantity);
  return newProduct;
};


module.exports = {
  create,
};
