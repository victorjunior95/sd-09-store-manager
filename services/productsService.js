const productsModel = require('../models/productsModel');

const listAll = () => {
  const allProducts =  productsModel.listAll();
  return allProducts;
};


module.exports = {
  listAll,
};
