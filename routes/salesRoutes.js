const express = require('express');
const salesRoutes = express.Router();

const {
  registerSaleController,
  findSaleController,
  updateSaleController,
  deleteSaleController,
} = require('./controllers/salesController');

const {
  registerSale,
  listAllSales,
  findSale,
  updateSale,
  deleteSale,
} = require('./services');

salesRoutes.post('/', registerSale, registerSaleController);
salesRoutes.get('/', listAllSales);
salesRoutes.get('/:id', findSale, findSaleController);
salesRoutes.put('/:id', updateSale, updateSaleController);
salesRoutes.delete('/:id', deleteSale, deleteSaleController);

module.exports = salesRoutes;
