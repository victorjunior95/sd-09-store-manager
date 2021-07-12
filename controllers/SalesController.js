const rescue = require('express-rescue');
const SalesService = require('../services/SalesService');
const STATUS_OK = 200;

const create = rescue(async(req, res) => {
  const sales = req.body;
  const newSales = await SalesService.create(sales);

  return res.status(STATUS_OK).json(newSales);
});

const getAll = rescue(async(_req, res) => {
  const sales = await SalesService.getAll();

  return res.status(STATUS_OK).json({ sales });
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;

  const saleId = await SalesService.getById(id);

  return res.status(STATUS_OK).json(saleId);
});

module.exports = {
  create,
  getAll,
  getById,
};