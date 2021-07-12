const salesModel = require('../models/salesModel');

function validateQuantities(sale) {
  const minimunQuantity = 1;
  const isMinimumQuantity = sale.some(({ quantity }) => quantity < minimunQuantity);
  const isQuantityString = sale.some(({ quantity }) => Number.isNaN(+quantity));
  if (isMinimumQuantity || isQuantityString) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      },
    };
  }
}

async function addSale(sale) {
  validateQuantities(sale);
  const result = await salesModel.addSale(sale);
  return { status: 200, result };
}

module.exports = {
  addSale,
};
