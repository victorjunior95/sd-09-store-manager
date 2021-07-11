const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');
const { addProduct } = require('../models/productsModel');

const productsRouter = express.Router();

productsRouter.post('/', rescue(productsController.addProduct));

productsRouter.get('/', rescue(productsController.getProducts));

productsRouter.get('/:id', rescue(productsController.getProductById));

module.exports = productsRouter;
