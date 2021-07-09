const express = require('express');
const saleServices = require('../services/salesServices');

const saleRouter = express.Router();

const ok = 200;
const created = 201;
const notFound = 404;
const unsprocessable = 422;

saleRouter.post('/', async (req, res, _next) => {
  const { body } = req;

  const newSale = await saleServices.validateSale(body);

  if (newSale.err) return res.status(unsprocessable).json(newSale);

  return res.status(ok).json(newSale);
});

saleRouter.get('/', async (_req, res, _next) => {
  const sales = await saleServices.findAllSales();

  return res.status(ok).json({ 'sales': sales });
});

saleRouter.get('/:id', async (req, res, _next) => {
  const { id } = req.params;

  const listSale = await saleServices.findSaleById(id);

  if (listSale.err) return res.status(notFound).json(listSale);

  return res.status(ok).json(listSale);
});

module.exports = saleRouter;
