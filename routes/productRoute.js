const express = require('express');
const productController = require('../controllers/productsController');
const middleware = require('../middlewares');

const product = express.Router();

product.post('/products/', middleware.products, productController.add);
product.get('/products/:id', productController.list);
product.get('/products/', productController.list);
product.put('/products/:id', middleware.products, productController.update);
product.delete('/products/:id', productController.remove);


module.exports = product;
