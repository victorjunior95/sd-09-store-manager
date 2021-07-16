const express = require('express');
const salesService = require('../services/salesService');
const salesMiddlewares = require('../middlewares/middlewareSales');
const SalesRouter = express.Router();

const HTTP_OK_STATUS = 200;

SalesRouter.post('/',
  salesMiddlewares.validaId,
  salesMiddlewares.validaQuantidade,
  async (req, res) => {
    const salesArray = req.body;
    const sales = await salesService.registerSales(salesArray);
    return res.status(HTTP_OK_STATUS).json(sales);
  }
);

module.exports = SalesRouter;