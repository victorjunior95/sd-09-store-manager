const rescue = require('express-rescue');
const Joi = require('@hapi/joi');
const services = require('../services/products');
const { CREATED, UNPROCESSED } = require('./httpCodes.json');
const { MIN_STRING, MIN_NUMBER } = require('./magicNumbers.json');

const create = rescue(async (request, response, next) => {

  const { error } = Joi.object({
    name: Joi.string().not().empty().min(MIN_STRING).required(),
    quantity: Joi.number().not().empty().min(MIN_NUMBER).required(),
  }).validate(request.body, { convert: false });

  if (error) return response.status(UNPROCESSED)
    .json({ err: { code: 'invalid_data', message: error.message}});

  const { name, quantity } = request.body;

  const newProduct = await services.create(name, quantity);
  console.log(newProduct);

  if (newProduct.err) return response.status(UNPROCESSED)
    .json({ err: { code: 'invalid_data', message: newProduct.error.message}});

  response.status(CREATED).json({
    _id: newProduct._id,
    name,
    quantity,
  });
});

module.exports = {
  create,
};
