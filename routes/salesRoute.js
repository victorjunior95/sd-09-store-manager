const express = require('express');
const rescue = require('express-rescue');

const {
  postSale,
  getAllSales,
  getOneSale,
  updateOneSale,
  deleteOneSale,
} = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.post('/', rescue(postSale));
salesRoute.get('/', rescue(getAllSales));
salesRoute.get('/:id', rescue(getOneSale));
salesRoute.put('/:id', rescue(updateOneSale));
salesRoute.delete('/:id', rescue(deleteOneSale));

module.exports = salesRoute;
