const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const {validatorNameAndQuant, validatorId} = require('../middlewares/validatorProduct');

const ProductsRouter = express.Router();

ProductsRouter.get('/', ProductsController.getAllProducts);

ProductsRouter.get('/:id', validatorId, ProductsController.findById);

ProductsRouter.post('/', validatorNameAndQuant, ProductsController.createProduct);

ProductsRouter.put('/:id',
  validatorId,
  validatorNameAndQuant,
  ProductsController.editProduct);

ProductsRouter.delete('/:id', validatorId, ProductsController.deleteProduct);

module.exports = ProductsRouter;
