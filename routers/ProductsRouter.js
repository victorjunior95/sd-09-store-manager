const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const { checkiD, checkNewProductInfo, checkifAlreadyExists } = require('../middlewares');

const ProductsRouter = express.Router();

ProductsRouter.get(['/', '/:id'], checkiD, ProductsController.getProducts);

ProductsRouter.post('/',
  checkifAlreadyExists, checkNewProductInfo, ProductsController.addProduct);

ProductsRouter.put('/:id',
  checkiD, checkNewProductInfo,
  ProductsController.updateProduct);

ProductsRouter.delete('/:id', checkiD, ProductsController.deleteProduct);

module.exports = ProductsRouter;
