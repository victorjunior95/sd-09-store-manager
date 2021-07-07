const express = require('express');

const ProductsController = require('../controllers/ProductsController');

const ProductRouter = express.Router();

ProductRouter.post('/', ProductsController.addNewProduct);

ProductRouter.get('/', ProductsController.getAllProducts);

ProductRouter.get('/:id', ProductsController.getProductById);

module.exports = ProductRouter;
