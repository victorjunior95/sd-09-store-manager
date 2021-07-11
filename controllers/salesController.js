const express = require('express');
const rescue = require('express-rescue');
const validateSales = require('../middlewares/salesValidator');

const { OK } = require('../utils/httpStatusCodes');
const salesServices = require('../services/salesServices');

const salesController = express.Router();

salesController.post('/', validateSales, rescue(async (req, res) => {
  const sales = req.body;

  const newSale = await salesServices.create(sales);

  return res.status(OK).json(newSale);
}));

module.exports = salesController;
