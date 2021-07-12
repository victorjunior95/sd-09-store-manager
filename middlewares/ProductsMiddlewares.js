const Joi = require('joi');
const errorObject = require('../utils/errorObject');

const NAME_MIN_LENGTH = 5;

const validateProduct = (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(NAME_MIN_LENGTH),
    quantity: Joi.number().integer().min(1),
  }).validate(req.body);

  if (error) return next(errorObject('invalid_data', error));

  return next();
};

module.exports = {
  validateProduct,
};
