const express = require('express');
const salesController = require('../controllers/salesController');
const salesRoute = express.Router();

salesRoute.post('/', salesController.create);

module.exports = salesRoute;