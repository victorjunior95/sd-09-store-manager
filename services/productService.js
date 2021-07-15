const productModel = require('../models/productModel');

const createProduct = async (name, quantity) => {
  const newProduct = productModel.create(name, quantity);
  return newProduct;
};

module.exports = {
  createProduct,
};
