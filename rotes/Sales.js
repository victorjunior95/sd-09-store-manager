const express = require('express');
const Router = express.Router();
const salesController = require('../controllers/Sales');
const salesMiddleware = require('../middlewares/Sales');

Router.post('/', salesMiddleware.saleValidator, salesController.createSale);
Router.get('/', salesController.getAllSales);
Router.get('/:id', salesMiddleware.idValidator, salesController.getSaleById);

module.exports = Router;