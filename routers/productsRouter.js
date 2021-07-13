const express = require('express');
const productsController = require('../controllers/productsController');
const rescue = require('express-rescue');
// rescue se comporta como um try catch para capturar os erros
// e passar pro middleware de erros genericos

const productsRouter = express.Router();

productsRouter.post('/', rescue(productsController.createProduct));

module.exports = productsRouter;
