const express = require('express');
const rescue = require('express-rescue');

const { postSale } = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute.post('/', rescue(postSale));

module.exports = salesRoute;
