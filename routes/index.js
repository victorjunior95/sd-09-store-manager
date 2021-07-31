const express = require('express');
const productController = require('../controllers/productController');
const productRoute = express.Router();

productRoute.post('./',productController.createProduct );

module.exports = {
  productRoute
};