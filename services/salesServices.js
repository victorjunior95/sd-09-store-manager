const sale = require('../models/salesModel');
const validation = require('../validation');

const createSale = async (listSolds) => {
  for (const { productId } of listSolds) {
    if (!(await validation.existIdProduct(productId))) return {
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    };
  }

  for (const { quantity } of listSolds) {
    if (!(await validation.isNumber(quantity))) return {
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    };
  }

  for (const { quantity } of listSolds) {
    if (!(await validation.isMustBeZero(quantity))) return {
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    };
  }

  const newSale = await sale.createSale(listSolds);
  return newSale;
};

const findById = async (salesId) => {
  if (!(await validation.validId(salesId))) return {
    'err':
      { 'code': 'not_found', 'message': 'Sale not found' }
  };

  const response = await sale.getSaleById(salesId);
  return response;
};

const updateSale = async (id, productId, quantity) => {
  if (!validation.isNumber(quantity)) return {
    'err': {
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'
    }
  };

  if (!validation.isMustBeZero(quantity)) return {
    'err': {
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'
    }
  };

  const saleUpdate = await sale.updateSale(id, productId, quantity);
  return saleUpdate;
};

const deleteSale = async (id) => {
  if (!(await validation.validId(id))) return {
    'err':
      { 'code': 'invalid_data', 'message': 'Wrong sale ID format' }
  };

  const result = await sale.deleteSale(id);
  return result;
};

module.exports = {
  createSale,
  findById,
  updateSale,
  deleteSale
};