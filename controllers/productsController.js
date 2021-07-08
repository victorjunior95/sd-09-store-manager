const express = require('express');
const productServices = require('../services/productsServices');

const productRouter = express.Router();

const ok = 200;
const created = 201;
const unprocessable = 422;

productRouter.post('/', async (req, res, _next) => {
  const { name, quantity } = req.body;

  const newProduct = await productServices.validateProduct(name, quantity);

  if (newProduct.err) return res.status(unprocessable).json(newProduct);

  return res.status(created).json(newProduct);
});

productRouter.get('/', async (_req, res, _next) => {
  const products = await productServices.findAllProducts();

  return res.status(ok).json({ 'products': products });
});

productRouter.get('/:id', async (req, res, _next) => {
  const { id } = req.params;

  const listProduct = await productServices.findOneProduct(id);

  if (listProduct.err) return res.status(unprocessable).json(listProduct);

  return res.status(ok).json(listProduct);
});

productRouter.put('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateProduct = await productServices.productToUpdate(id, name, quantity);

  if (updateProduct && updateProduct.err) {
    return res.status(unprocessable).json(updateProduct);
  }

  return res.status(ok).json(updateProduct);
});

productRouter.delete('/:id', async (req, res, _next) => {
  const { id } = req.params;

  const productDeleted = await productServices.productToDelete(id);

  if (productDeleted.err) {
    return res.status(unprocessable).json(productDeleted);
  }

  return res.status(ok).json(productDeleted);
});

module.exports = productRouter;
