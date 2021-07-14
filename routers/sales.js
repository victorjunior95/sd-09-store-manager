const express = require('express');
const { create, getAll, findById, update } = require('../controllers/sales');
const sales = express.Router();

sales.post('/', create);

sales.get('/', getAll);

sales.get('/:id', findById);

sales.put('/:id', update);

module.exports = sales;
