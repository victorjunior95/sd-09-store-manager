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

SalesRouter.get('/:id', isValidId, SalesController.findById);

SalesRouter.post('/',
  validatorIdAndQuantity,
  buyProduct,
  SalesController.createSales);

SalesRouter.put('/:id', validatorIdAndQuantity, SalesController.editSale);

SalesRouter.delete('/:id', validatorId, deleteSale, SalesController.deleteSale);

module.exports = SalesRouter;