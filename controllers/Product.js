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

const edit = rescue (async(req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const FIVE = 5;
  const OK = 200;
  const { error } = Joi.object({
    name: Joi.string().min(FIVE).not().empty().required(),
    quantity: Joi.number().integer().min(1).not().empty().required(),
  }).validate(req.body);
  if (error) {
    return next(error);
  }
  const editedProduct = await service.edit(id, name, quantity);
  if (editedProduct.error) return next(editedProduct.error);
  return res.status(OK).json(editedProduct);
});

const getAll = async (req, res) => {
  const OK = 200;
  const products = await service.getAll();
  res.status(OK).json(products);
};

const getOne = rescue (async (req, res, next) => {
  const OK = 200;
  const { id } = req.params;
  const product = await service.findById(id);
  if (product.error) return next(product.error);
  return res.status(OK).json(product);
});

const deleteOne = rescue (async (req, res, next) => {
  const OK = 200;
  const { id } = req.params;
  const deleted = await service.deleteOne(id);
  if (deleted.error) return next(deleted.error);
  return res.status(OK).json(deleted);
});

module.exports = { create, getAll, getOne, edit, deleteOne };
