const express = require('express');
const productsService = require('../services/productService');

const productRouter = express.Router();

const { code: { created, unprocessable_entity, OK } } = require('../utils');

productRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.create(name, quantity);

  if (newProduct.err) return res.status(unprocessable_entity).json(newProduct);
  return res.status(created).json(newProduct);
});

productRouter.get('/', async (_req, res) => {
  const allProducts = await productsService.getAll();
  if (!allProducts) return res.status(unprocessable_entity).json(newProduct);
  return res.status(OK).json(allProducts);
});

module.exports = productRouter;
