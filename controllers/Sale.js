const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/Sale');

const create = rescue (async(req, res, next) => {
  const OK = 200;
  const soldProducts = req.body;
  const newSale = await service.create(soldProducts);
  if (newSale.error) return next(newSale.error);
  return res.status(OK).json(newSale);
});

module.exports = { create };
