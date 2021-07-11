const rescue = require('express-rescue');
const Joi = require('joi');

const Products = require('../services/Products');

const MIN_NAME = 5;
const MIN_QUANTITY = 1;
const CODE_CREATE = 201;
const CODE_VALUE = 200;

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

  return res.status(CODE_CREATE).json(newProduct[0]);
});

const getAll = rescue(async (_req, res) => {
  const products = await Products.getAll();

  return res.status(CODE_VALUE).json({ products });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const findProduct = await Products.findById(id);

  if (findProduct.err) return next(findProduct);

  return res.status(CODE_VALUE).json(findProduct);
});

const change = rescue(async (req, res, next) => {
  const { id } = req.params;

  const { error } = Joi.object({
    name: Joi.string().not().empty().min(MIN_NAME).required(),
    quantity: Joi.number().integer().min(MIN_QUANTITY).required(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }

  const { name, quantity } = req.body;

  const changeProduct = await Products.change(id, name, quantity);

  if (changeProduct.err) return next(changeProduct);

  return res.status(CODE_VALUE).json({ _id: id, name, quantity });
});

const exclude = rescue(async (req, res, next) => {
  const { id } = req.params;

  const excludeProduct = await Products.exclude(id);

  if (excludeProduct.err) return next(excludeProduct);

  return res.status(CODE_VALUE).json(excludeProduct);
});


module.exports = {
  create,
  getAll,
  findById,
  change,
  exclude,
};
