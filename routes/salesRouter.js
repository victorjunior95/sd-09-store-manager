const express = require('express');
const salesRouter = express.Router();

const {
  registerSalesController,
  getAllSalesController,
  getSalesByIdController,
  updateSalesByIdController,
  deleteSalesByIdController,
} = require('../controllers/salesController');

salesRouter.post('/', registerSalesController);
salesRouter.get('/', getAllSalesController);
salesRouter.get('/:id', getSalesByIdController);
salesRouter.put('/:id', updateSalesByIdController);
salesRouter.delete('/:id', deleteSalesByIdController);

module.exports = salesRouter;
