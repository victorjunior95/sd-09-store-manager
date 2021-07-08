const Joi = require('@hapi/joi');

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

  if (error) return next(error);

  next();
};

module.exports = validSales;
