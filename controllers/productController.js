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

module.exports = router;