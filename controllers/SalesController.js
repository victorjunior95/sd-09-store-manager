const express = require('express');
const mdwSales = require('../middlewares/mdwSales');

const SalesRouter = express.Router();

SalesRouter.post('/', mdwSales.verifyProductsOfSale, mdwSales.putOneSale);

module.exports = SalesRouter ;