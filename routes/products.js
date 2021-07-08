const express = require('express');
const products = require('../controllers/products');

const route = express.Router();

route.post('/', products.create);
route.get('/', products.getAll);
route.get('/:id', products.getById);
route.put('/:id', products.update);
route.delete('/:id', products.remove);

module.exports = route;
