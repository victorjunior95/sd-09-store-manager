const salesModel = require('../models/salesModel');
const productServices = require('../services/productsServices');

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

function validateDelete(sale) {
  if(!sale) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
      },
    };
  }
}

async function decreaseQuantities(sale) {
  for (const product of sale) {
    await productServices.decreaseQuantity(product.productId, product.quantity);
  }
}

async function increaseQuantities(sale) {
  for (const product of sale) {
    await productServices.increaseQuantity(product.productId, product.quantity);
  }
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

async function addSale(sale) {
  validateQuantities(sale);
  const result = await salesModel.addSale(sale);
  await decreaseQuantities(sale);
  return { status: 200, result };
}

async function deleteSale(id) {
  const result = await salesModel.deleteSale(id);
  validateDelete(result);
  await increaseQuantities(result.itensSold);
  return { status: 200, result };
}

async function updateSale(id, sale) {
  validateQuantities(sale);
  const result = await salesModel.updateSale(id, sale);
  return { status: 200, result };
}

module.exports = {
  addSale,
  getSaleById,
  getSales,
  updateSale,
  deleteSale,
};
