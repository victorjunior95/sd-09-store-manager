const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', rescue(salesController.createSale));
salesRouter.get('/', rescue(salesController.getAllSales));
salesRouter.get('/:id', rescue(salesController.getSaleById));
salesRouter.put('/:id', rescue(salesController.editSale));
salesRouter.delete('/:id', rescue(salesController.deleteSale));


module.exports = salesRouter;
