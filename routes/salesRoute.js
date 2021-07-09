const express = require('express');
const rescue = require('express-rescue');

const { postSale, getAllSales, getOneSale } = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.post('/', rescue(postSale));
salesRoute.get('/', rescue(getAllSales));
salesRoute.get('/:id', rescue(getOneSale));

module.exports = salesRoute;
