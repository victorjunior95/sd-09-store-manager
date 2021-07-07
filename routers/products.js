const express = require('express');
const { create } = require('../controllers/products');
const product = express.Router();

product.post('/', create);

module.exports = product;
