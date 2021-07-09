const express = require('express');
const { create, getAll, findById, update } = require('../controllers/products');
const product = express.Router();

product.post('/', create);

product.get('/', getAll);

product.get('/:id', findById);

product.put('/:id', update);

module.exports = product;
