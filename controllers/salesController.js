const express = require('express');
const salesService = require('../services/salesService');
const salesMiddlewares = require('../middlewares/middlewareSales');
const SalesRouter = express.Router();

const HTTP_OK_STATUS = 200;

SalesRouter.get('/', async (_req, res) => {
  const allSales = await salesService.listAll();
  return res.status(HTTP_OK_STATUS).json({ sales: allSales });
});

SalesRouter.get('/:id',
  salesMiddlewares.validaIdParams,
  async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.listSaleId(id);
    return res.status(HTTP_OK_STATUS).json(sale);
  });

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