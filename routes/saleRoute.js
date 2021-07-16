const express = require('express');
const saleController = require('../controllers/saleController');
const saleRoute = express.Router();

// cria nova vendas
saleRoute.post('/', saleController.createNewSale);

// lista todas as vendas
saleRoute.get('/', saleController.listAllSales);

module.exports = saleRoute;