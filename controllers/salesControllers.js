const express = require('express');
const saleServices = require('../services/salesServices');

const saleRouter = express.Router();

const ok = 200;
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

saleRouter.put('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const { body } = req;

  const updateSales =
    await saleServices.saleToUpdate(id, body[0].productId, body[0].quantity);

  if (updateSales.err) {
    return res.status(unsprocessable).json(updateSales);
  }

  return res.status(ok).json(updateSales);
});

saleRouter.delete('/:id', async (req, res, _next) => {
  const { id } = req.params;

  const saleDeleted = await saleServices.saleToDelete(id);

  if (saleDeleted.err) {
    return res.status(unsprocessable).json(saleDeleted);
  }

  return res.status(ok).json(saleDeleted);
});

module.exports = saleRouter;
