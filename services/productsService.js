const productsModel = require('../models/productsModel');

const listAll = () => {
  const allProducts =  productsModel.listAll();
  return allProducts;
};

const registerProduct = (name, quantity) => {
  
  return productsModel.registerProduct(name, Number(quantity));
};

const getProduct = (name) => {
  return productsModel.getProduct(name);
};

module.exports = {
  listAll,
  registerProduct,
  getProduct,
};
