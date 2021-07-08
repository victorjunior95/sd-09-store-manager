const express = require('express');
const { createProduct } = require('../controllers/productsController');
const productsRoute = express.Router();

productsRoute.post('/', createProduct);

module.exports = productsRoute;
