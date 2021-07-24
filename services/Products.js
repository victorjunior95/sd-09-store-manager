const productsModel = require('../models/Products');

const createProduct = (name, quantity) => productsModel.createProduct(name, quantity);
const getAllProducts = () => productsModel.getAllProducts();
const getProductById = (id) => productsModel.getProductById(id);
const editProduct = (id, name, quantity) => productsModel.editProduct(id, name, quantity);
const deleteProduct = (id) => productsModel.deleteProduct(id);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct
};