const express = require('express');
const { create } = require('../controllers/productsController');
const product = express.Router();

product.post('/', create);

module.exports = product;
