const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.post('/', rescue(productsController.addProduct));

productsRouter.get('/', rescue(productsController.getProducts));

productsRouter.get('/:id', rescue(productsController.getProductById));

productsRouter.put('/:id', rescue(productsController.updateProduct));

productsRouter.delete('/:id', rescue(productsController.deleteProduct));

module.exports = productsRouter;
