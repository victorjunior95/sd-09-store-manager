const express = require('express');
const {
  validateProduct,
  validateProductId,
} = require('../middlewares/ProductsMiddlewares');
const ProductsController = require('../controllers/ProductsController');


const ProductsRouter = express.Router();

ProductsRouter.post('/', validateProduct, ProductsController.create);
ProductsRouter.get('/', ProductsController.getAll);
ProductsRouter.get('/:id', validateProductId, ProductsController.getById);

module.exports = ProductsRouter;
