const Router = require('express').Router();
const {
  createProduct,
  getProductsList,
  getProductById,
  updateProductById,
  deleteProductById
} = require('../controllers/products.controller');

Router.route('/')
  .get(getProductsList)
  .post(createProduct);

Router.route('/:id')
  .put(updateProductById)
  .delete(deleteProductById)
  .get(getProductById);

module.exports = Router;
