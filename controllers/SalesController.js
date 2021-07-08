const express = require('express');
const mdwSales = require('../middlewares/mdwSales');

const SalesRouter = express.Router();

SalesRouter.get('/', mdwSales.getAllSales);
SalesRouter.get('/:id', mdwSales.getOneSale);
SalesRouter.post('/', mdwSales.verifyProductsOfSale, mdwSales.putOneSale);

module.exports = SalesRouter ;