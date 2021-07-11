const rescue = require('express-rescue');
const Joi = require('joi');

const Products = require('../services/Products');

const MIN_NAME = 5;
const MIN_QUANTITY = 1;
const CODE_CREATE = 201;
const CODE_SELECT = 200;

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

  return res.status(CODE_SELECT).json({ products });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const findProduct = await Products.findById(id);

  if (findProduct.err) return next(findProduct);

  return res.status(CODE_SELECT).json(findProduct);
});

module.exports = {
  create,
  getAll,
  findById,
};
