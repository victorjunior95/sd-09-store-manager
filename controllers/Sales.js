const Sales = require('../services/Sales');
const rescue = require('express-rescue');

const getAll = rescue(async (req, res) => {
  const { status, sales } = await Sales.getAll();
  res.status(status).json(sales);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const { status, sale } = await Sales.findById(id);
  res.status(status).json(sale);
});

const newSale = rescue(async (req, res) => {
  const sale = req.body;
  const { status, addSale } = await Sales.newSale(sale);
  res.status(status).json(addSale);
});

module.exports = {
  getAll,
  findById,
  newSale
};
