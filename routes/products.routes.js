const Router = require('express').Router();
const {
  createProduct,
  getProductsList,
  getProductById
} = require('../controllers/products.controller');

Router.route('/')
  .get(getProductsList)
  .post(createProduct);

Router.route('/:id')
  .get(getProductById);

module.exports = Router;
