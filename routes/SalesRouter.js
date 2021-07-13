const express = require('express');
const rescue = require('express-rescue');
const {
  validateSale,
  validateSaleId,
} = require('../middlewares/SalesMiddlewares');
const SalesController = require('../controllers/SalesController');

const SalesRouter = express.Router();

SalesRouter.post(
  '/',
  rescue(validateSale),
  rescue(SalesController.create),
);
SalesRouter.get(
  '/',
  rescue(SalesController.getAll),
);
SalesRouter.get(
  '/:id',
  rescue(validateSaleId),
  rescue(SalesController.getById),
);
// SalesRouter.put(
//   '/:id',
//   rescue(validateProductId),
//   rescue(validateProduct),
//   rescue(ProductsController.update),
// );
// SalesRouter.delete(
//   '/:id',
//   rescue(validateProductId),
//   rescue(ProductsController.remove),
// );

module.exports = SalesRouter;
