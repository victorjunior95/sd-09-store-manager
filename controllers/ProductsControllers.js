const express = require('express');
const { createService, getAllService } = require('../services/ProductsService');

const ProductsRouter = express.Router();

ProductsRouter.get('/', async (_req, res) => {
  const numberStatusOk = 200;

  const products = await getAllService();

  return res.status(numberStatusOk).json(products);
});

ProductsRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const numberStatusOk = 201;
  const numberStatusErr = 422;

  const newProduct = await createService(name, quantity);

  if(newProduct.err) return res.status(numberStatusErr).json(newProduct);

  return res.status(numberStatusOk).json(newProduct);
});

module.exports = ProductsRouter;
