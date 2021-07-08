const express = require('express');
const SalesController = require('../controllers/SalesController');

const SalesRouter = express.Router();

SalesRouter.post('/', SalesController.addNewSale);

SalesRouter.get('/', SalesController.getAllSales);

SalesRouter.get('/:id', SalesController.getSaleById);

module.exports = SalesRouter;
