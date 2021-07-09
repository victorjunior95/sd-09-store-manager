const express = require('express');

const {
  salesRegister,
  getAllSales,
  getSaleById,
} = require('../controllers/salesControlles');

const router = express.Router();

router.post('/', salesRegister);

router.get('/', getAllSales);

router.get('/:id', getSaleById);

module.exports = router;
