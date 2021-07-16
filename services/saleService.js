const saleModel = require('../models/saleModel');

let err = {
  code: 'invalid_data',
  message: ''
};

const createSale = async (products) => {
  const newSale = await saleModel.create(products);

  return newSale;
};

module.exports = {
  createSale,
};