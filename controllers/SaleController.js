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

module.exports = SaleRouter;
