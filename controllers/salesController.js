const rescue = require('express-rescue');
const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');

const status = {
  created: 201,
  notFound: 404,
  ok: 200,
  unprocessableEntity: 422,
};

const getAllSales = [rescue(async (req, res) => {
  const sales = await salesModel.getAllSales();
  return res.status(status.ok).json({sales});
}), (err, req, res, next) => {
  return res.status(status.unprocessableEntity).json(err);
}];

const getSaleById = [rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  return res.status(status.ok).json(sale);
}), (err, req, res, next) => {
  return res.status(status.notFound).json(err);
}];

const insertSale = [rescue(async (req, res) => {
  const [...orders] = req.body;
  const sales = await salesService.insertSale(orders);
  return res.status(status.ok).json(sales);
}), (err, req, res, next) => {
  return res.status(status.unprocessableEntity).json(err);
}];

const updateSale = [rescue(async (req, res) => {
  const { id } = req.params;
  const [...saleInfo] = req.body;
  const updatedSale = await salesService.updateSale(id, saleInfo);
  return res.status(status.ok).json(updatedSale);
}), (err, req, res, next) => {
  return res.status(status.unprocessableEntity).json(err);
}];

const deleteSale = [rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.deleteSale(id);
  return res.status(status.ok).json(sale);
}), (err, req, res, next) => {
  return res.status(status.unprocessableEntity).json(err);
}];

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  deleteSale,
  updateSale,
};
