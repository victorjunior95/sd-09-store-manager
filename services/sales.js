const Joi = require('@hapi/joi');
const { MIN_NUMBER } = require('../constants/magicNumbers.json');
const { ObjectId } = require('mongodb');
const Sale = require('../models/sales');

const create = async (sale) => {
  const { error } = Joi.array().items(
    Joi.object({
      productId: Joi.string().not().empty().required(),
      quantity: Joi.number().not().empty().min(MIN_NUMBER).required(),
    })
  ).validate(sale);

  if (error) return {
    err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
  };

  sale.forEach(product => {
    if (!ObjectId.isValid(product.productId)) {
      return { err: { code: 'invalid_data', message: 'Wrong id format'}};
    }
  });

  const newSale = await Sale.create(sale);
  return newSale.ops[0];
};

const getAll = async () => {
  
  const sales = await Sale.getAll();
  
  return sales;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { code: 'not_found', message: 'sale not found' } };
  }

  const sale = await Sale.findById(id);

  return sale;
};

module.exports = { create, getAll, findById };