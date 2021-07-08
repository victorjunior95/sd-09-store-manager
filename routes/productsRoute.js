const express = require('express');

const {
  postProductToDB,
  getAllProducts,
  getProductById,
  updateProductById,
} = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.post('/', postProductToDB);
productsRoute.get('/', getAllProducts);
productsRoute.get('/:id', getProductById);
productsRoute.put('/:id', updateProductById);

module.exports = productsRoute;