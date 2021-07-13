const salesModel = require('../models/salesModel');
const Joi = require('@hapi/joi');

const MIN_QUANTITY = 1;

const saleItemsValidationSchema = Joi.object({
  quantity: Joi.number().min(MIN_QUANTITY).required()
    .messages({
      'number.base': 'Wrong product ID or invalid quantity',
      'number.min': 'Wrong product ID or invalid quantity'
    })
});

const createSale = async (soldItems) => {
  const validationResult = soldItems
    .map(({ quantity }) => saleItemsValidationSchema.validate({ quantity }))
    .find((validations) => Object.keys(validations).includes('error'));
  if (validationResult) {
    return { err: {
      code: 'invalid_data',
      message: validationResult.error.details[0].message
    } };
  }
  const newSale = await salesModel.createSale(soldItems);
  if (!newSale) return { err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  } };
  return newSale;
};

const updateSale = async (id, soldItems) => {
  const validationResult = soldItems
    .map(({ quantity }) => saleItemsValidationSchema.validate({ quantity }))
    .find((validations) => Object.keys(validations).includes('error'));
  if (validationResult) {
    return { err: {
      code: 'invalid_data',
      message: validationResult.error.details[0].message
    } };
  }
  const updatedSale = await salesModel.updateSale(id, soldItems);
  if (!updatedSale) return { err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  } };
  return updatedSale;
};

module.exports = {
  createSale,
  updateSale,
};
