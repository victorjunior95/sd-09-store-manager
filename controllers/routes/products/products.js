const express = require('express');
const postProduct = require('./middlewares/postProduct');
const getProducts = require('./middlewares/getProducts');
const getProduct = require('./middlewares/findProducts');
const putProduct = require('./middlewares/putProduct');
const deleteProduct = require('./middlewares/deleteProduct');

const route = express.Router();

route.get('/', getProducts);

route.get('/:id', getProduct);

route.post('/', postProduct);

route.put('/:id', putProduct);

route.delete('/:id', deleteProduct);

module.exports = route;
