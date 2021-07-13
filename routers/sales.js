const express = require('express');
const { create } = require('../controllers/sales');
const sales = express.Router();

sales.post('/', create);

module.exports = sales;
