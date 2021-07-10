const express = require('express');

const {
  salesRegister,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
} = require('../controllers/salesControlles');

const router = express.Router();

router.post('/', salesRegister);

router.get('/', getAllSales);

router.get('/:id', getSaleById);

router.put('/:id', updateSale);

router.delete('/:id', deleteSale);

module.exports = router;
