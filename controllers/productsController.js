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

  if (productUpdated.err) return res.status(unprocessable_entity).json(productUpdated);

  return res.status(OK).json(productUpdated);
});

productRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const productDeleted = await productsService.deleteProduct(id);
  if (productDeleted.err) return res.status(unprocessable_entity).json(productDeleted);

  return res.status(OK).json(productDeleted);
});

module.exports = productRouter;
