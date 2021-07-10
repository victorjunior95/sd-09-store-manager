const rescue = require('express-rescue');
const Joi = require('joi');

const ProductsServices = require('../services/ProductsServices');
const STATUS_OK = 200;
const CREATE = 201;
const MIN_LENGTH = 5;
const HIGHER_THAN = 0;

const create = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(MIN_LENGTH).required(),
    quantity: Joi.number().integer().min(HIGHER_THAN).required()
  }).validate(req.body);

  if (error) {
    return next(error);
  }

  const {name, quantity} = req.body;
  const newProduct = await ProductsServices.create(name, quantity);
  
  if (newProduct.err) {
    next(newProduct.err);
  }

  return res.status(CREATE).json(newProduct);
});

const getAll = rescue(async (req, res) => {
  const products = await ProductsServices.getAll();

  return res.status(STATUS_OK).json(products);
});

module.exports = {
  getAll,
  create
};