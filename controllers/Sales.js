const salesService = require('../services/Sales');
const rescue = require('express-rescue');

const createSale = rescue(async (req, res) => {
  const sales = req.body;
  const response = await salesService.createSale(sales);
  return res.status(response.code).json(response.result);
});

const getAllSales = rescue(async (_req,res) => {
  const response = await salesService.getAllSales();
  return res.status(response.code).json(response.result);
});

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getSaleById(id);
  return res.status(response.code).json(response.result);
});

module.exports = { createSale, getAllSales, getSaleById };