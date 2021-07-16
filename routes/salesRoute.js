const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.post('/', rescue(salesController.createSale));
salesRoute.get('/', rescue(salesController.getAllSales));
salesRoute.get('/:id', rescue(salesController.getSaleById));
salesRoute.put('/:id', rescue(salesController.editSale));
salesRoute.delete('/:id', rescue(salesController.deleteSale));


module.exports = salesRoute;
