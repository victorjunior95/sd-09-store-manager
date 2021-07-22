const productsModel = require('../models/productsModel');

const createProductServices = async(name, quantity) => {
  const newProduct = await productsModel.dbProduct(name, quantity);

  return newProduct;
};

module.exports = createProductServices;
