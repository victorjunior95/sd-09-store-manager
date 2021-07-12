const express = require('express');
const rescue = require('express-rescue');
const validateSales = require('../middlewares/salesValidator');

const { ok } = require('../utils/httpStatusCodes');
const salesServices = require('../services/salesServices');

const salesController = express.Router();

salesController.get('/', rescue(async (_req, res) => {
  const sales = await salesServices.findAll();

  res.status(ok).json({ sales }); 
}));

salesController.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const sales = await salesServices.findById(id);

  res.status(ok).json(sales); 
}));

salesController.post('/', validateSales, rescue(async (req, res) => {
  const sales = req.body;

  const newSale = await salesServices.create(sales);

  return res.status(ok).json(newSale);
}));

salesController.put('/:id', validateSales, rescue(async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const updatedSale = await salesServices.update(id, sale);

  return res.status(ok).json(updatedSale);
}));

module.exports = salesController;
