const express = require('express');
const rescue = require('express-rescue');
const sales = require('../controllers/sales');

const route = express.Router();

route.post('/', rescue(sales.postSale));
route.get('/', rescue(sales.getAllSales));
route.get('/', rescue(sales.getSalesbyId));
route.put('/', rescue(sales.putSale));
route.delete('/', rescue(sales.deleteSale));

module.exports = route;
