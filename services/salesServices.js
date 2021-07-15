const sale = require('../models/salesModel');
const product = require('./productServices');
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
    if (!(await validation.isNumber(quantity) )) return {
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    };
  }

  for (const { quantity } of listSolds) {
    if (!(await validation.isMustBeZero(quantity) )) return {
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    };
  }

  const newSale = await sale.createSale(listSolds);
  return newSale;
};

const listSalesById = async (salesId) => {

};


module.exports = {
  createSale
};