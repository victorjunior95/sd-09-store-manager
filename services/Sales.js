const model = require('../models/Sales');

function saleValidation(sale) {
  if (sale.quantity < 1 || typeof sale.quantity !== 'number') {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    };
  }
}

function findSale(sale) {
  if (!sale) {
    throw {
      status: 404,
      err: {
        code: 'invalid_data',
        message: 'Sale not found',
      },
    };
  };
}

async function idValidation(id) {
  const sale = await model.findById(id);
  if (!sale) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  };
}

async function newSale(sale) {
  saleValidation(sale);
  const result = await model.newSale(sale);
  return { status: 200, result };
}

async function fetchSales() {
  const result = await model.fetchSales();
  return { status: 200, result };
}

async function findById(id) {
  const result = await model.findById(id);
  findSale(result);
  return { status: 200, result };
}

async function updateSale(id, sale) {
  saleValidation(sale);
  const result = await model.updateSale(id, sale);
  return { status: 200, result };
}

async function deleteSale(id) {
  await idValidation(id);
  const result = await model.deleteSale(id);
  return { status: 200, result };
}

module.exports = {
  newSale,
  fetchSales,
  findById,
  updateSale,
  deleteSale,
};
