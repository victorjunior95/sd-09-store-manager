const Sales = require('../services/SalesService');

// const STATUS_201 = 201;
const STATUS_200 = 200;

const addNewSale = async (req, res, next) => {
  const sales = await Sales.addNewSale(req.body);

  if (sales.err) return next(sales);

  res.status(STATUS_200).json(...sales);
};

const getAll = async (_req, res, _next) => {
  const sales = await Sales.getAll();
  res.status(STATUS_200).json(sales);
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  const sale = await Sales.getOne(id);

  if (sale.err) return next(sale);

  res.status(STATUS_200).json(sale);
  
};

module.exports = {
  addNewSale,
  getAll,
  getOne,
};