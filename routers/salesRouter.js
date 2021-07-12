const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', rescue(salesController.addSale));

module.exports = salesRouter;
