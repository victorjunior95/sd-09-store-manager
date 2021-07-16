const express = require('express');
const {
  validatorIdAndQuantity,
  isValidId,
  validatorId,
  deleteSale,
  buyProduct} = require('../middlewares/validatorSale');
const SalesController = require('../controllers/SalesController');

const SalesRouter = express.Router();

SalesRouter.get('/', SalesController.getAllSales);

SalesRouter.get('/:id', SalesController.findById);

SalesRouter.post('/', SalesController.addSale);

SalesRouter.put('/:id', SalesController.editSale);

SalesRouter.delete('/:id', SalesController.deleteSale);

module.exports = SalesRouter;
