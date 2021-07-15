const express = require('express');
const productController = require('../controllers/productController');
const productRoute = express.Router();

productRoute.post('/', productController.createNewProduct);

module.exports = productRoute;