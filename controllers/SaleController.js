const { Router } = require('express');
const SaleService = require('../services/SaleService');

const SaleRouter = Router();

const HTTP_OK = 200;

SaleRouter.post('/', async (req, res, next) => {
  const salesData = req.body;
  const response = await SaleService.create(salesData);
  if (response.err) {
    return next(response);
  }
  return res.status(HTTP_OK).json(response);
});

SaleRouter.get('/', async (_req, res) => {
  const response = await SaleService.getAll();
  return res.status(HTTP_OK).json({ sales: response });
});

SaleRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const response = await SaleService.getById(id);
  if (response.err) {
    return next(response);
  }
  return res.status(HTTP_OK).json(response);
});

SaleRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const salesData = req.body;
  const response = await SaleService.updateById(id, salesData);
  if (response.err) {
    return next(response);
  }
  return res.status(HTTP_OK).json(response);
});

module.exports = SaleRouter;
