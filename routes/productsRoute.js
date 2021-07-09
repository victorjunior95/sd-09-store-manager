const express = require('express');
const rescue = require('express-rescue');

const {
  postProductToDB,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.post('/', rescue(postProductToDB));
productsRoute.get('/', rescue(getAllProducts));
productsRoute.get('/:id', rescue(getProductById));
productsRoute.put('/:id', rescue(updateProductById));
productsRoute.delete('/:id', rescue(deleteProductById));

module.exports = productsRoute;