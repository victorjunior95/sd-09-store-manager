const productModel = require('../models/product');

const getAllProduct = async () => {
  const products = await productModel.getProducts();
  return products;
};

const createProduct = async(name, quantity) => {
  const product = await productModel.createProduct(name, quantity);
  return product;
};

const findById = async(_id) => {
  const findId = await productModel.productsId(_id);
  return findId;
};

const editProduct = async (_id, name, quantity) => {
  const editProduct = await productModel.editProducts(_id, name, quantity);
  return editProduct;
};

const deleteProduct = async(_id) => {
  const deleteProduct = await productModel.deleteProduct(_id);
  return deleteProduct;
};

module.exports = { getAllProduct, createProduct, findById, editProduct, deleteProduct};
