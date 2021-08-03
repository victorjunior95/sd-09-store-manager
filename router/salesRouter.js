const express = require('express');

const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.sales.addSales);
router.get('/', Controller.sales.getSales);

module.exports = router;
