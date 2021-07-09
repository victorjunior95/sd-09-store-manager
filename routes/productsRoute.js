const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  putProduct,
  deleteProduct,
} = require('../controllers/productsController');
const productsRoute = express.Router();

productsRoute.post('/', createProduct);
productsRoute.get('/', getProducts);
productsRoute.get('/:id', getProductById);
productsRoute.put('/:id', putProduct);
productsRoute.delete('/:id', deleteProduct);

module.exports = productsRoute;
