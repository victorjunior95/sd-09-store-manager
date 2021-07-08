const express = require('express');

const {
  postProductToDB,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.post('/', postProductToDB);
productsRoute.get('/', getAllProducts);
productsRoute.get('/:id', getProductById);
productsRoute.put('/:id', updateProductById);
productsRoute.delete('/:id', deleteProductById);

module.exports = productsRoute;