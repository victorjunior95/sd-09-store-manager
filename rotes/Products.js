const express = require('express');
const Router = express.Router();
const productsController = require('../controllers/Products');
const productsMidleware = require('../middlewares/Products');

Router.post('/',
  productsMidleware.createValidator, productsController.create);

module.exports = Router;