const Router = require('express').Router();
const { createProduct } = require('../controllers/products.controller');

Router.route('/')
  .post(createProduct);

module.exports = Router;
