const express = require('express');
const { createService } = require('../services/ProductsService');

const ProductsRouter = express.Router();

ProductsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const numberStatusOk = 201;
  const numberStatusErr = 422;

  const newProduct = await createService(name, quantity);

  if(newProduct.err) res.status(numberStatusErr).json(newProduct.err);

  return res.status(numberStatusOk).json(newProduct);
});

module.exports = ProductsRouter;
