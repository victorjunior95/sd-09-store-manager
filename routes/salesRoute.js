const express = require('express');
const salesController = require('../controllers/salesController');
const salesRoute = express.Router();

salesRoute.post('/', salesController.create);
salesRoute.get('/', salesController.getAll);
salesRoute.get('/:id', salesController.getSale);

module.exports = salesRoute;