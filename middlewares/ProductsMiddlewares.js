const Joi = require('joi');
const { ObjectId } = require('mongodb');
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

const validateProductId = (req, _res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return next(errorObject('invalid_data', 'Wrong id format'));

  return next();
};

module.exports = {
  validateProduct,
  validateProductId,
};
