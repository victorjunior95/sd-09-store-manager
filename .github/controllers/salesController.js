const { Router } = require('express');
const SaleService = require('../services/salesServices');

const SaleRouter = Router();

const HTTP_OK = 200;

SaleRouter.post('/', async (req, res, next) => {
  try {
    const salesData = req.body;
    const result = await SaleService.create(salesData);
    return res.status(HTTP_OK).json(result);
  } catch(err) {
    next(err);
  }
});

SaleRouter.get('/', async (_req, res) => {
  const result = await SaleService.getAll();
  return res.status(HTTP_OK).json({ sales: result });
});

SaleRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SaleService.getById(id);
    return res.status(HTTP_OK).json(result);
  } catch(err) {
    next(err);
  }
});

SaleRouter.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const salesData = req.body;
    const result = await SaleService.updateById(id, salesData);
    return res.status(HTTP_OK).json(result);
  } catch(err) {
    next(err);
  }
});

SaleRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await SaleService.deleteById(id);
    return res.status(HTTP_OK).json(result);
  } catch(err) {
    next(err);
  }
});

module.exports = SaleRouter;
