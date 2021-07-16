const { Router } = require('express');

const salesController = require('../controllers/salesController');

const router = Router();

router.route('/')
  .post(salesController.createSales)
  .get(salesController.findAll);

router.route('/:id')
  .get(salesController.findOne)
  .put(salesController.updateSale)
  .delete(salesController.deleteSale);

module.exports = router;
