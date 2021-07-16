const express = require('express');
const saleController = require('../controllers/saleController');
const saleRoute = express.Router();

// cria nova vendas
saleRoute.post('/', saleController.createNewSale);

// lista todas as vendas
saleRoute.get('/', saleController.listAllSales);

// procura venda por id
saleRoute.get('/:id', saleController.findSaleById);

// atuliza venda
saleRoute.put('/:id', saleController.updateSaleData);

// deleta produto
saleRoute.delete('/:id', saleController.deleteSaleData);

module.exports = saleRoute;