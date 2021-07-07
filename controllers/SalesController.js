const express = require('express');
//const mdwSales = require('../middlewares/mdwSales');

const SalesRouter = express.Router();

SalesRouter.get('/', (_req, res) => res.send('deu bao na sales'));

module.exports = SalesRouter ;