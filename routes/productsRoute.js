const express = require('express');

const {
  postProductToDB,
  getAllProducts,
  getProductById,
} = require('../controllers/productsController');

const productsRoute = express.Router();

productsRoute.post('/', postProductToDB);

productsRoute.get('/', getAllProducts);

productsRoute.get('/:id', getProductById);

module.exports = productsRoute;