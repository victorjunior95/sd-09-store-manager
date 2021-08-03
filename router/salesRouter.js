const express = require('express');

const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.sales.addSales);
router.get('/', Controller.sales.getSales);

router.get('/:id', Controller.sales.getSaleById);
router.put('/:id', Controller.sales.updateSale);

module.exports = router;
