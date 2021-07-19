const express = require('express');
const middlewares = require('../middlewares');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.post(
  '/',
  middlewares.idValidationInArray,
  middlewares.quantityValidationInArray,
  salesController.create,
);

router.get(
  '/',
  salesController.getAllSales,
);

router.get(
  '/:id',
  salesController.getSaleById,
);

router.put(
  '/:id',
  middlewares.quantityValidationInArray,
  middlewares.idValidation,
  salesController.updateSale,
);

router.delete(
  '/:id',
  middlewares.saleIdValidation,
  salesController.deleteSale,
);

module.exports = router;
