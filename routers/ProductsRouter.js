const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const {validatorNameQuant, validatorId} = require('../middlewares/validatorProduct');

const ProductsRouter = express.Router();

ProductsRouter.get('/', ProductsController.getAllProducts);

ProductsRouter.get('/:id', validatorId, ProductsController.getProductById);

ProductsRouter.post('/', validatorNameQuant, ProductsController.addProduct);

ProductsRouter.put('/:id',
  validatorId,
  validatorNameQuant,
  ProductsController.updateProduct);

ProductsRouter.delete('/:id', validatorId, ProductsController.deleteProduct);

module.exports = ProductsRouter;
