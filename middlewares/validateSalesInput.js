const Joi = require('@hapi/joi');

const validateSalesInput = (req, res, next) => {
  const OBJECT_ID_LENGTH = 24;

  const customError = 'Wrong product ID or invalid quantity';
  const { error } = Joi.array().items({
    productId: Joi.string().regex(/^[a-f0-9]{24}$/).required().messages({
      'string.pattern.base': customError,
      'string.base': customError,
      'any.required': customError,
    }),
    quantity: Joi.number().min(1).required().messages({
      'number.min':customError,
      'number.base': customError,
      'any.required': customError
    }),
  }).validate(req.body);

  if(error) return next(error);

  next();
};

module.exports = validateSalesInput;
