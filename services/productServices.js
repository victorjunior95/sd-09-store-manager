const product = require('../models/productModel');

const createProduct = async (name, quantity) => {
  const item = await product.createProduct(name, quantity);
  const newProduct = JSON.stringify(item);
  return newProduct;
};

const updadteProduct = async (id, name, quantity) => {
  const item = await product.updateProduct(id, name, quantity);
  return item;
};

const deleteProduct = async (id) => {
  const item = await product.deleteProduct(id);
  return item;
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct
};