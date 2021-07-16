
const express = require('express');
const productsController = require('../controllers/productsController');
const rescue = require('express-rescue');
// rescue se comporta como um try catch e utilizar um next

const productsRoute = express.Router();

productsRoute.post('/', rescue(productsController.createProduct));
productsRoute.get('/', rescue(productsController.getAllProducts));
productsRoute.get('/:id', rescue(productsController.getProductById));
productsRoute.put('/:id', rescue(productsController.editProduct));
productsRoute.delete('/:id', rescue(productsController.deleteProduct));

module.exports = productsRoute;
