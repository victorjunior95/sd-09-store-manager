const express = require('express');
const SalesService = require('../services/SalesService');
const {validatorIdAndQuantity} = require('../middlewares/validatorSale');

const statusSucessCreate = 201;
const statusSucess = 200;

const SalesRouter = express.Router();

SalesRouter.post('/', validatorIdAndQuantity, async (req, res, _next) => {
  const { body } = req;

  const sale = await SalesService.addSale(body);

  return res.status(statusSucess).json(sale);
});

module.exports = SalesRouter;

