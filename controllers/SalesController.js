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

module.exports = {
  create
};