const {
  createSales,
} = require('../model/salesModel');

const VALUE_LIMIT = 1;
const ERROR_MESSAGE = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  }
};

const validSales = (sales) => {
  let message = null;
  sales.forEach((sale) => {
    if (sale.quantity < VALUE_LIMIT || typeof sale.quantity === 'string') {
      message = ERROR_MESSAGE;
    }
  });

  return message;
};

const createSalesService = async (sales) => {
  let result = validSales(sales);

  if (result === null) result = await createSales(sales);

  return result;
};

module.exports = {
  createSalesService,
};
