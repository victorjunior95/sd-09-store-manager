const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById
} = require('../controllers/productsController');
const productsRoute = express.Router();

productsRoute.post('/', createProduct);
productsRoute.get('/', getProducts);
productsRoute.get('/:id', getProductById);

module.exports = productsRoute;
