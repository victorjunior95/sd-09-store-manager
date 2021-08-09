const express = require('express');
const rescue = require('express-rescue');
const products = require('../controllers/products');

const route = express.Router();

route.post('/', rescue(products.postProduct));
route.get('/', rescue(products.getAllProducts));
route.get('/', rescue(products.getProductById));
route.put('/', rescue(products.putProduct));
route.delete('/', rescue(products.deleteProduct));

module.exports = route;
