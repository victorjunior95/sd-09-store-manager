const express = require('express');
const { create, getAll, findById, update, del } = require('../controllers/products');
const product = express.Router();

product.post('/', create);

product.get('/', getAll);

product.get('/:id', findById);

product.put('/:id', update);

product.delete('/:id', del);

module.exports = product;
