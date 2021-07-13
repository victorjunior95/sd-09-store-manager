const express = require('express');
const productsController = require('../controllers/productsController');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros
// e passar pro middleware de erros genericos

const productsRouter = express.Router();

productsRouter.post('/', rescue(productsController.createProduct));
productsRouter.get('/', rescue(productsController.getAllProducts));
productsRouter.get('/:id', rescue(productsController.getProductById));
productsRouter.put('/:id', rescue(productsController.editProduct));
productsRouter.delete('/:id', rescue(productsController.deleteProduct));

module.exports = productsRouter;
