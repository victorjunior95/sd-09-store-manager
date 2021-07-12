const salesModel = require('../models/SalesModel');
const Joi = require('@hapi/joi');
const MINIMUM_CHARACTER = 5;
const MINIMUM_AMOUNT = 1;
const unprocessableEntity = 422;
const STATUS_NOT_FOUND = 404;

const genericMessageSales = 'Wrong product ID or invalid quantity';

const schemaSale = Joi.array().items(Joi.object({
  productId: Joi.required()
    .messages({
      'any.required': genericMessageSales
    }),
  quantity: Joi.number()
    .integer()
    .min(MINIMUM_AMOUNT)
    .required()
    .messages({
      'number.base': genericMessageSales,
      'number.min': genericMessageSales,
      'number.integer': genericMessageSales,
      'array.base': genericMessageSales,
      'any.unknown': genericMessageSales,
    }),
}));

const errorHandling = (status, code, message) => {
  return {
    status,
    code,
    message
  };
};

const create = async(sales) => {
  const sale = await salesModel.create(sales);

  const { error } = schemaSale.validate(sale.itensSold);

  if(error) {
    throw errorHandling(unprocessableEntity, 'invalid_data', error.details[0].message);
  }

  return sale;
};

const getAll = async() => {
  const sales = await salesModel.getAll();

  return sales;
};

const getById = async (id) => {
  const saleId = await salesModel.getById(id);

  if (!saleId) {
    throw errorHandling(STATUS_NOT_FOUND, 'not_found', 'Sale not found');
  }

  return saleId;
};

module.exports = {
  create,
  getAll,
  getById,
};