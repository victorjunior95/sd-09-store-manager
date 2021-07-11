const express = require('express');
const rescue = require('express-rescue');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.post('/', rescue(productsController.addProduct));

module.exports = productsRouter;
