const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', rescue(salesController.addSale));

salesRouter.get('/', rescue(salesController.getSales));

salesRouter.get('/:id', rescue(salesController.getSaleById));

salesRouter.put('/:id', rescue(salesController.updateSale));

module.exports = salesRouter;
