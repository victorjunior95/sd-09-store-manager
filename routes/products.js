const express = require('express');
const products = require('../controllers/products');
const validate = require('../middlewares/validator');

const route = express.Router();

route.post('/', validate.product, validate.productExists, products.create);
route.get('/', products.getAll);
route.get('/:id', validate.productId, products.getById);

module.exports = route;