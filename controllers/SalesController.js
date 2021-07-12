const express = require('express');

const SalesService = require('../services/SalesService');

const SalesRouter = express.Router();

const STATUS_OK = 200;

SalesRouter.post('/', async (req, res) => {
  const sales = req.body;
  try {
    const newSale = await SalesService.salesProduct(sales);
    return res.status(STATUS_OK).json(newSale);
  } catch (error) {
    return res.status(error.status).json(error.error);
  }
});

SalesRouter.get('/', async (req, res) => {
  const allSales = await SalesService.listAllSales();
  return res.status(STATUS_OK).json(allSales);
});

SalesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await SalesService.listOneSale(id);
    return res.status(STATUS_OK).json(sale);
  } catch (error) {
    return res.status(error.status).json(error.error);
  }
});

SalesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  try {
    const newSale = await SalesService.updateSale(id, sales);
    return res.status(STATUS_OK).json(newSale);
  } catch (error) {
    return res.status(error.status).json(error.error);
  }
});

SalesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSale = await SalesService.deleteSale(id);
    return res.status(STATUS_OK).json(deletedSale);
  } catch (error) {
    return res.status(error.status).json(error.error);
  }
});

module.exports = SalesRouter;