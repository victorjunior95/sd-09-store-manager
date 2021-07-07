const express = require('express');
const productServices = require('../services/productsServices');

const productRouter = express.Router();

const created = 201;
const unprocessable = 422;

productRouter.post('/', async (req, res, _next) => {
  const { name, quantity } = req.body;

  const newProduct = await productServices.validateProduct(name, quantity);

  if (newProduct.err) return res.status(unprocessable).json(newProduct);

  return res.status(created).json(newProduct);
});

module.exports = productRouter;
