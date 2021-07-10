const rescue = require('express-rescue');
const Joi = require('joi');

const Products = require('../services/Products');

const MIN_NAME = 5;
const MIN_QUANTITY = 1;
const CODE_OK = 201;

const create = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().min(MIN_NAME).required(),
    quantity: Joi.number().integer().min(MIN_QUANTITY).required(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }

  const { name, quantity } = req.body;

  const newProduct = await Products.create(name, quantity);

  if (newProduct.err) return next(newProduct);

  return res.status(CODE_OK).json(newProduct[0]);
});

module.exports = {
  create,
};
