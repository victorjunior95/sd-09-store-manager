const express = require('express');
const mdwSales = require('../middlewares/mdwSales');

const SalesRouter = express.Router();

SalesRouter.get('/', mdwSales.getAllSales);
SalesRouter.get('/:id', mdwSales.validateAndFindSaleId, mdwSales.getOneSale);
SalesRouter.post('/', mdwSales.verifyProductsOfSale, mdwSales.postOneSale);
SalesRouter.put('/:id',
  mdwSales.validateAndFindSaleId,
  mdwSales.verifyProductsOfSale,
  mdwSales.putOneSale);
SalesRouter.delete('/:id', mdwSales.validateSaleId, mdwSales.deleteOneSale);

module.exports = SalesRouter ;