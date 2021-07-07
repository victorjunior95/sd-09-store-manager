const Joi = require('@hapi/joi');
const { registerProductModel } = require('../models/registerProductModel');
const { invalidProduct } = require('../dictionary/dictionaryError');
const { httpStatusCode: { unprocessableEntity } } = require('../utils');

const minLength = 5;
const minQuantity = 0;

const productSchema = Joi.object({
  name: Joi.string()
    .min(minLength)
    .required(),

  quantity: Joi.number()
    .integer()
    .greater(minQuantity)
    .required()
});

const registerProductService = async (name, quantity) => {
  const { error } = productSchema
    .validate({name, quantity});
  if (error) throw invalidProduct(unprocessableEntity, 'invalid_data', error.message);
  

  const response = await registerProductModel(name, quantity);
  return response;
};

module.exports = { registerProductService };
