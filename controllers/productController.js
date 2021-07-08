const productService = require('../services/productService');
const express = require('express');
const router = express.Router();

const statusSucessCreate = 201;
const statusSucess = 200;

router.post('/', async (req, res, next) => {
  const { name, quantity } = req.body;

  const products = await productService.create(name, quantity);

  if (products.error) return next(products);

  res.status(statusSucessCreate).json(products);

});

router.get('/', async (req, res, next) => {
  const products = await productService.getAll();

  return res.status(statusSucess).json({ products });
});

router.get('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const product = await productService.getById(id);

  return res.status(statusSucess).json(product);
});

module.exports = router;