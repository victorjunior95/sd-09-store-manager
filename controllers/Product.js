const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/Product');

const create = rescue (async(req, res, next) => {
  const { name, quantity } = req.body;
  const FIVE = 5;
  const CREATED = 201;
  const { error } = Joi.object({
    name: Joi.string().min(FIVE).not().empty().required(),
    quantity: Joi.number().integer().min(1).not().empty().required(),
  }).validate(req.body);
  if (error) {
    return next(error);
  }
  const newProduct = await service.create(name, quantity);
  if (newProduct.error) return next(newProduct.error);
  return res.status(CREATED).json(newProduct);
});

module.exports = { create };
