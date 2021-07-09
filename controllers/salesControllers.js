const express = require('express');
const saleServices = require('../services/salesServices');

const saleRouter = express.Router();

const ok = 200;
const created = 201;
const unsprocessable = 422;

saleRouter.post('/', async (req, res, _next) => {
  const { body } = req;

  const newSale = await saleServices.validateSale(body);

  if (newSale.err) return res.status(unsprocessable).json(newSale);

  return res.status(ok).json(newSale);
});

module.exports = saleRouter;
