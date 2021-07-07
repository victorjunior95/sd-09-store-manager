const rescue = require('express-rescue');
const boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const services = require('../services/productsService');
const CREATED = 201;

const create = rescue(async (request, response, next) => {

  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    quantity: Joi.number().not().empty().required(),
  }).validate(request.body);

  if (error) return next(error);

  const { name, quantity } = request.body;

  const newProduct = await services.create(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  response.status(CREATED).json({
    _id: newProduct._id,
    name,
    quantity,
  });
});

module.exports = {
  create,
};
