const {
  createSales,
} = require('../models/sales');

const { validSales } = require('./tools');

const createSalesService = async (sales) => {
  let result = validSales(sales);

  if (result === null) {
    result = await createSales(sales);
  };

  return result;
};

module.exports = {
  createSalesService,
};