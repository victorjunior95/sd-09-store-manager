const express = require('express');
const salesService = require('../services/salesService');

const salesRouter = express.Router();

const { code: { created, unprocessable_entity, OK, not_found } } = require('../utils');

salesRouter.post('/', async (req, res) => {
  const productsArray = req.body;
  const newSale = await salesService.create(productsArray);

  if (newSale.err) return res.status(unprocessable_entity).json(newSale);
  return res.status(OK).json(newSale);
});

salesRouter.get('/', async (_req, res) => {
  const allSales = await salesService.getAll();

  return res.status(OK).json(allSales);
});

salesRouter.get('/:id', async (req, res) => {
  const id = req.params;
  const sale = await salesService.getById(id);
  console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSss Sale', sale);

  if (sale.err) return res.status(not_found).json(sale);
  return res.status(OK).json(sale);
});

module.exports = salesRouter;
