const express = require('express');
const Router = express.Router();
const productsController = require('../controllers/Products');
const productsMidleware = require('../middlewares/Products');

Router.post('/', productsMidleware.productValidator, productsController.create);
Router.get('/', productsController.getAll);
Router.get('/:id', productsMidleware.idValidator, productsController.getById);
Router.put('/:id', productsMidleware.productValidator, productsController.edit);
Router.delete('/:id', productsMidleware.idValidator, productsController.deleteProduct);

module.exports = Router;