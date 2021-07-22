const express = require('express');
const ProductsController = require('../controllers/productsController');
const SalesController = require('../controllers/salesController');

const API_ROUTES = express.Router();

API_ROUTES.use('/products', ProductsController);
API_ROUTES.use('/sales', SalesController);

module.exports = API_ROUTES;
