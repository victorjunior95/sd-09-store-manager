const rescue = require('express-rescue');
const Joi = require('joi');

const SalesServices = require('../services/SalesServices');

const STATUS_OK = 200;


const create = rescue(async (req, res, next) => {
  const {error} = Joi.array().items({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).not().empty().required(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }

  const sale = req.body;

  const newSale = await SalesServices.create(sale);

  return res.status(STATUS_OK).json(newSale);
});

const getAll = rescue(async (req, res, next) => {
  const sales = await SalesServices.getAll();  
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

module.exports = {
  create,
  getAll,
  findById
};