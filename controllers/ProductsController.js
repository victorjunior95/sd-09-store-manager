const rescue = require('express-rescue');
const Joi = require('joi');

const ProductsServices = require('../services/ProductsServices');
const STATUS_OK = 200;
const CREATE = 201;
const MIN_LENGTH = 5;
// const HIGHER_THAN = 0;

const productSchema = Joi.object({
  name: Joi.string().min(MIN_LENGTH).not().empty().required(),
  quantity: Joi.number().integer().min(1).not().empty().required(),
});

const create = rescue(async (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const {name, quantity} = req.body;
  const newProduct = await ProductsServices.create(name, quantity);

  if (newProduct.error) {
    return next(newProduct.error);
  }

  return res.status(CREATE).json(newProduct);
});

const getAll = rescue(async (req, res) => {
  const products = await ProductsServices.getAll();

  return res.status(STATUS_OK).json(products);
});

const getById = rescue(async(req, res, next) => {
  const {id} = req.params;
  const product = await ProductsServices.getById(id);

  if (product.error) {
    return next(product.error);
  }

  return res.status(STATUS_OK).json(product);
});

const updateOne = rescue(async(req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const {id} = req.params;
  const {name, quantity} = req.body;

  const updateProduct = await ProductsServices.updateOne(id, name, quantity);

  return res.status(STATUS_OK).json(updateProduct);  
});

const deleteProduct = rescue(async (req, res, next) => {
  const {id} = req.params;
  const deletedProduct = await ProductsServices.deleteProduct(id);

  if (deletedProduct.error) {
    return next(deletedProduct.error);
  }

  return res.status(STATUS_OK).json(deletedProduct);
});

module.exports = {
  getAll,
  create,
  getById,
  updateOne,
  deleteProduct
};