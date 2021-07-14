const express = require('express');
const ProductsService = require('../services/ProductsService');
const {validatorNameQuant, validatorId} = require('../middlewares/validatorProduct');

const statusSucessCreate = 201;
const statusSucess = 200;

const ProductsRouter = express.Router();

ProductsRouter.delete('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const product = await ProductsService.deleteProduct(id);

  return res.status(statusSucess).json(product);
});

ProductsRouter.put('/:id', validatorNameQuant, async (req, res, _next) => {
  const { id } = req.params;
  const {name, quantity} = req.body;
  const product = await ProductsService.updateProduct(id, name, quantity);

  return res.status(statusSucess).json({id, name, quantity});
});

ProductsRouter.get('/', async (_req, res, _next) => {
  const allProducts = await ProductsService.getAllProducts();

  return res.status(statusSucess).json({ products: allProducts });
});

ProductsRouter.get('/:id', validatorId, async (req, res, _next) => {
  const { id } = req.params;
  const product = await ProductsService.getProductById(id);

  return res.status(statusSucess).json(product);
});

ProductsRouter.post('/', validatorNameQuant, async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await ProductsService.addProduct(name, quantity);

  if (product.err) return next(product.err);

  return res.status(statusSucessCreate).json(product);
});



module.exports = ProductsRouter;

