const sales = require('../models/salesModule');
const validate = require('./validateSales');

const create = async (products) => {
  products.forEach(({ quantity }) => validate.quantity(quantity));

  const itensSold = [{ itensSold: [...products] }];
  const result = await sales.create(itensSold);
  return result;
};

module.exports = {
  create,
};