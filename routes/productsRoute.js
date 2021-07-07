const express = require('express');

const ProductsController = require('../controllers/ProductsController');

const ProductRouter = express.Router();

ProductRouter.post('/', ProductsController.addNewProduct);

ProductRouter.get('/', ProductsController.getAllProducts);

ProductRouter.get('/:id', ProductsController.getProductById);

ProductRouter.put('/:id', ProductsController.updateProduct);

ProductRouter.delete('/:id', ProductsController.deleteProduct);

module.exports = ProductRouter;
