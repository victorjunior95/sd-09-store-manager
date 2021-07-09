const rescue = require('express-rescue');
const SalesService = require('../services/salesService');

const OK = 200;
const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;

const findAll = rescue(async (_req, res) => {
  const sales = await SalesService.findAll();
  return res.status(OK).json(sales);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.findById(id);

  if (sale.err) return res.status(NOT_FOUND).json(sale);

  return res.status(OK).json(sale);
});

const create = rescue(async (req, res) => {
  const { body } = req;
  const sale = await SalesService.create(body);
  
  if (sale.err) return res.status(UNPROCESSABLE_ENTITY).json(sale);
  return res.status(OK).json(sale);
});

const update = rescue(async (req, res) => {
  const productsSales = req.body;
  const { id } = req.params;

  const setSale = await SalesService.update({ id, productsSales });

  if (setSale.err) return res.status(UNPROCESSABLE_ENTITY).json(setSale);
  return res.status(OK).json({ _id: id, itensSold: [...productsSales] });
});

const exclude = rescue(async (req, res) => {
  const { id } = req.params;

  const deleted = await SalesService.exclude(id);

  if(deleted.err) return res.status(UNPROCESSABLE_ENTITY).json(deleted);
  return res.status(OK).json(deleted);
});

module.exports = {
  findAll,
  findById,
  create,
  update,
  exclude,
};