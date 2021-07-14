const express = require('express');
const { create, getAll, findById } = require('../controllers/sales');
const sales = express.Router();

sales.post('/', create);

sales.get('/', getAll);

sales.get('/:id', findById);

module.exports = sales;
