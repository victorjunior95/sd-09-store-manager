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
  if (!allProducts) return res.status(unprocessable_entity).json(allProducts);
  return res.status(OK).json(allProducts);
});

productRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  if (product.err) return res.status(unprocessable_entity).json(product);

  return res.status(OK).json(product);
});

productRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const productUpdated = await productsService.upDate(id, name, quantity);
  console.log('111111111111111111111111111111111111111111111')
  if (productUpdated.err) return res.status(unprocessable_entity).json(productUpdated);
  console.log('11111111111111111111122222222222222222222222222')

  return res.status(OK).json(productUpdated);
});

module.exports = productRouter;
