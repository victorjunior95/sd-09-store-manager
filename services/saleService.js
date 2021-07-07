const saleModel = require('../models/saleModel');
const helper = require('../helpers');

const createSale = async (products) => {
  const sale = await saleModel.createSale(products);
  if (helper.verifySaleQuantity(products[0].quantity)) {
    return helper.verifySaleQuantity(products[0].quantity);
  }
  return sale;
};

module.exports = {
  createSale,
};
