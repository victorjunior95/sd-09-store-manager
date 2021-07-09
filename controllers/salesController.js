const rescue = require('express-rescue');
const SalesService = require('../services/salesService');

const OK = 200;
const UNPROCESSABLE_ENTITY = 422;

const findAll = rescue(async (_req, res) => {
  const sales = await SalesService.findAll();
  return sales;
});

const create = rescue(async (req, res) => {
  const { body } = req;
  const sale = await SalesService.create(body);
  
  if (sale.err) return res.status(UNPROCESSABLE_ENTITY).json(sale);
  return res.status(OK).json(sale);
});

module.exports = {
  findAll,
  create,
};