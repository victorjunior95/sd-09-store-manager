const express = require('express');
const { validatorIdAndQuantity } = require('../middlewares/validatorSale');
const SalesService = require('../services/SalesService');
const statusSucessCreate = 201;
const statusSucess = 200;

const SalesRouter = express.Router();

SalesRouter.post('/', validatorIdAndQuantity, async (req, res, _next) => {
  const { body } = req;

  const productsSale = await SalesService.createSales(body);

  return res.status(statusSucess).json(productsSale);
});

module.exports = SalesRouter;