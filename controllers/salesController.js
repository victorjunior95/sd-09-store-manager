const express = require('express');
const salesService = require('../services/salesService');

const salesRouter = express.Router();

const { code: { created, unprocessable_entity, OK } } = require('../utils');

salesRouter.post('/', async (req, res) => {
  const productsArray = req.body;
  const newSale = await salesService.create(productsArray);

  if (newSale.err) return res.status(unprocessable_entity).json(newSale);
  return res.status(OK).json(newSale);
});

module.exports = salesRouter;
