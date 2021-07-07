const { Router } = require('express');
const SalesController = require('../Controller/SalesController');

const SalesRouter = Router();

SalesRouter
  .get('/', SalesController.getAllSales)
  .post('/', SalesController.createSale);

SalesRouter.get('/:id', SalesController.getOneSale)
  .put('/:id', SalesController.editSale)
  .delete('/:id', SalesController.deleteSale);

module.exports = SalesRouter;
