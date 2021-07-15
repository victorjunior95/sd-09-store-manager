const { Router } = require('express');
const SaleService = require('../services/SaleService');

const SaleRouter = Router();

const HTTP_OK = 200;

SaleRouter.post('/', async (req, res, next) => {
  try {
    const salesData = req.body;
    const response = await SaleService.create(salesData);
    return res.status(HTTP_OK).json(response);
  } catch(err) {
    next(err);
  }
});

SaleRouter.get('/', async (_req, res) => {
  const response = await SaleService.getAll();
  return res.status(HTTP_OK).json({ sales: response });
});

SaleRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await SaleService.getById(id);
    return res.status(HTTP_OK).json(response);
  } catch(err) {
    next(err);
  }
});

SaleRouter.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const salesData = req.body;
    const response = await SaleService.updateById(id, salesData);
    return res.status(HTTP_OK).json(response);
  } catch(err) {
    next(err);
  }
});

SaleRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await SaleService.deleteById(id);
    return res.status(HTTP_OK).json(response);
  } catch(err) {
    next(err);
  }
});

module.exports = SaleRouter;
