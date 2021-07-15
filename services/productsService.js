const productsModel = require('../models/productsModel');
const { ObjectID } = require('mongodb');
const listAll = () => {
  const allProducts = productsModel.listAll();
  return allProducts;
};

const registerProduct = (name, quantity) => {
  
  return productsModel.registerProduct(name, Number(quantity));
};

const getProduct = (name) => {
  return productsModel.getProduct(name);
};

const listProductId = (id) => {
  return productsModel.listProductId(ObjectID(id));
};

const editProduct = (id, name, quantity) => {
  return productsModel.editProduct(ObjectID(id), name, quantity);
};

module.exports = {
  listAll,
  registerProduct,
  getProduct,
  listProductId,
  editProduct,
};
