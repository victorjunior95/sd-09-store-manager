const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const services = require('../services/products');
const { CREATED } = require('./httpCodes');
const { MIN_STRING, MIN_NUMBER } = require('./magicNumbers.json');

const create = rescue(async (request, response, next) => {

  const { error } = Joi.object({
    name: Joi.string().not().empty().min(MIN_STRING).required(),
    quantity: Joi.number().not().empty().min(MIN_NUMBER).required(),
  }).validate(request.body);

  if (error) return response.json(boom.badData(`${error.message}`));

  const { name, quantity } = request.body;

  const newProduct = await services.create(name, quantity);

  if (newProduct.err) return boom.badData(newProduct.err.message);

  response.status(CREATED).json({
    _id: newProduct._id,
    name,
    quantity,
  });
});

module.exports = {
  create,
};
