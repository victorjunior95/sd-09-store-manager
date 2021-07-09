const express = require('express');
const { create, getAll } = require('../controllers/products');
const product = express.Router();

product.post('/', create);

product.get('/', getAll);

module.exports = product;
