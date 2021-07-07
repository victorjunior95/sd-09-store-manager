const express = require('express');
const productsRouter = express.Router();

const {
  registerProductController,
  getAllProductsController,
  getByIdController,
  updateProductByIdController,
  deleteProductByIdController,
} = require('../controllers/productsController');

productsRouter.post('/', registerProductController);
productsRouter.get('/', getAllProductsController);
productsRouter.get('/:id', getByIdController);
productsRouter.put('/:id', updateProductByIdController);
productsRouter.delete('/:id', deleteProductByIdController);

module.exports = productsRouter;
