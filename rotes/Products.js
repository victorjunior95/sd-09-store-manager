const express = require('express');
const Router = express.Router();
const productsController = require('../controllers/Products');
const productsMidleware = require('../middlewares/Products');

Router.post('/', productsMidleware.productValidator, productsController.createProduct);
Router.get('/', productsController.getAllProducts);
Router.get('/:id', productsMidleware.idValidator, productsController.getProductById);
Router.put('/:id', productsMidleware.productValidator, productsController.editProduct);
Router.delete('/:id', productsMidleware.idValidator, productsController.deleteProduct);

module.exports = Router;