const rescue = require('express-rescue');
const service = require('../services/Sales');

const OK = 200;

const registerSales = rescue(async (req, res, next) => {

  const newSales = await service.registerSales(req.body);

  if (newSales.err) return next(newSales.err);

  return res.status(OK).json(newSales);
});

const getSales = rescue(async (_req, res, _next) => {
  const salesList = await service.listSales();

  return res.status(OK).json(salesList);
});

const getSalesListById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const foundList = await service.getSalesListById(id);

  if (foundList.err) return next(foundList.err);

  return res.status(OK).json(foundList);
});

module.exports = {
  registerSales,
  getSales,
  getSalesListById,
};
