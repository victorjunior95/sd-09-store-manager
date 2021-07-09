const Joi = require('@hapi/joi');
const invalidData = require('../utils/errosFunctions');

const UNPROCESSABLE_ENTITY = 422;

const validSales = (req, _res, next) => {
  const MIN_QUANTITY = 1;

  const messageErrorSales = 'Wrong product ID or invalid quantity';
  
  const { error } = Joi.array().items({
    productId: Joi.required(),
    quantity: Joi.number().min(MIN_QUANTITY).required().messages({
      'number.min': messageErrorSales,
      'number.base': messageErrorSales,
      'any.required': messageErrorSales,
    }),
  }).validate(req.body);

  if (error) return next(invalidData
  ('invalid_data', error.message, UNPROCESSABLE_ENTITY));

  next();
};

module.exports = validSales;
