const express = require('express');
const { create, getAll, findById } = require('../controllers/products');
const product = express.Router();

product.post('/', create);

product.get('/', getAll);

product.get('/:id', findById);

module.exports = product;
