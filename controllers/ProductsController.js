const express = require('express');
const ProductsService = require('../services/ProductsService');
const {validatorNameAndQuant} = require('../middlewares/validatorProduct');
const statusSucessCreate = 201;

const ProductsRouter = express.Router();

ProductsRouter.post('/', validatorNameAndQuant, async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await ProductsService.createProduct(name, quantity);

  if (product.err) return next(product.err);

  return res.status(statusSucessCreate).json(product);
});

module.exports = ProductsRouter;
