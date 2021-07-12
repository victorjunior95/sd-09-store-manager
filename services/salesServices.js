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

function validateSale(sale) {
  if(!sale) {
    throw {
      status: 404,
      result: {
        err: {
          code: 'not_found',
          message: 'Sale not found',
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

async function getSaleById(id) {
  const result = await salesModel.getSaleById(id);
  validateSale(result);
  return { status: 200, result };
}

async function getSales() {
  const result = await salesModel.getSales();
  return { status: 200, result };
}

module.exports = {
  addSale,
  getSaleById,
  getSales,
};
