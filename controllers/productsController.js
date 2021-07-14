const express = require('express');
const productsService = require('../services/productsService');
const ProductsRouter = express.Router();

const HTTP_OK_STATUS = 200;

ProductsRouter.get('/', async (req, res) => {
  const products = await productsService.listAll();
  return res.status(HTTP_OK_STATUS).json(products);
});

ProductsRouter.post('/products', (req, res) => {

});

module.exports = ProductsRouter;