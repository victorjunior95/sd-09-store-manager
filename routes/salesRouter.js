const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.salesCreation);
router.get('/', salesController.listAllSales);
router.get('/:id', salesController.listSaleById);
router.put('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

module.exports = router;