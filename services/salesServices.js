const sale = require('../models/salesModel');
const product = require('./productServices');
const validation = require('../validation');
const { valid } = require('joi');

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
  const validId = await (await sale.getAllSales()).find((sale) => sale._id === salesId);
  if (!validId) return {
    'err':
      { 'code': 'not_found', 'message': 'Sale not found' }
  };

  const response = await sale.getSaleById(salesId);
  return response;
};


module.exports = {
  createSale,
  findById
};