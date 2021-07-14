const rescue = require('express-rescue');
const Joi = require('@hapi/joi');

const SalesServices = require('../services/SalesServices');

const STATUS_OK = 200;
const NOT_FOUND = 404;

const errorMessage = 'Wrong product ID or invalid quantity';

const saleSchema = Joi.array().items({
  productId: Joi.string().required().messages({
    'any.required': errorMessage
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': errorMessage,
    'number.min': errorMessage,
    'number.integer': errorMessage,
    'array.base': errorMessage,
    'any.unknown': errorMessage,
  })
});

const create = rescue(async (req, res, next) => {
  const {error} = saleSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const sale = req.body;

  const newSale = await SalesServices.create(sale);

  if (newSale.error) {
    return next(newSale.error);
  }


  return res.status(STATUS_OK).json(newSale);
});

const getAll = rescue(async (_req, res, next) => {
  const sales = await SalesServices.getAll();

  if (sales.error) {
    return next(sales.error);
  }

  return res.status(STATUS_OK).json(sales);
});

const findById = rescue(async (req, res, next) => {
  const {id} = req.params;

  const sale = await SalesServices.findById(id);

  if (sale.error) {
    return next(sale.error);
  }
  
  return res.status(STATUS_OK).json(sale);
});

const updateOne = rescue(async (req, res, next) => {
  const {error} = saleSchema.validate(req.body);

  if (error) {
    return next(error);
  }

  const {id} = req.params;
  const body = req.body;
  const updateSale = await SalesServices.updateOne(id, body);

  return res.status(STATUS_OK).json(updateSale);
});

const deleteOne = rescue(async (req, res, next) => {
  const {id} = req.params;

  const sale = await SalesServices.deleteOne(id);

  if (sale.error) {
    return next(sale.error);
  }

  res.status(STATUS_OK).json(sale);
});

module.exports = {
  create,
  getAll,
  findById,
  updateOne,
  deleteOne
};