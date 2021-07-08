const Joi = require('joi');
const rescue = require('express-rescue');
const service = require('../services/Products');

const CREATED = 201;

const createProduct = rescue(async (req, res, next) => {
  // const { error } = Joi.object({
  //   name: Joi.string().min(5).required(),
  //   quantity: Joi.number().min(5).required(),
  // }).validate(req.body);

  // if (error) {
  //   return next(error);
  // }

  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  return res.status(CREATED).json(newProduct);
});

module.exports = {
  createProduct,
};
