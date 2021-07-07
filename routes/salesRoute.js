const express = require('express');
const SalesController = require('../controllers/SalesController');

const salesRouter = express.Router();

salesRouter.get('/sales', SalesController);

module.exports = salesRouter;
