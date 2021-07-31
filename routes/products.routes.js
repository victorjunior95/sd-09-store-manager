const Router = require('express').Router();
const {
  createProduct,
  getProductsList,
  getProductById,
  updateProductById
} = require('../controllers/products.controller');

Router.route('/')
  .get(getProductsList)
  .post(createProduct);

Router.route('/:id')
  .put(updateProductById)
  .get(getProductById);

module.exports = Router;
