const Sales = require('../services/Sales');
const rescue = require('express-rescue');

const createNewSale = rescue( async (req, res) => {
  const sale = req.body;
  const { status, newSale } = await Sales.createNewSale(sale);

  res.status(status).json(newSale);
});

const getAll = rescue(async (req, res) => {
  const { sales, status } = await Sales.getAll();
  res.status(status).json(sales);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const { status, sale } = await Sales.findById(id);
  res.status(status).json(sale);
});

const updateSale = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const { status, updatedSale} = await Sales.updateSale(id, sale);
  res.status(status).json(updatedSale);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;
  const { status, deletedSale } = await Sales.deleteSale(id);
  res.status(status).json(deletedSale);
});

module.exports = {
  createNewSale,
  getAll,
  findById,
  updateSale,
  deleteSale,
};