const express = require('express');
const saleController = require('../controllers/salesController');
const middleware = require('../middlewares');

const sale = express.Router();

sale.post('/sales/', middleware.sales, saleController.add);
sale.get('/sales/:id', saleController.list);
sale.get('/sales/', saleController.list);
sale.put('/sales/:id', middleware.sales, saleController.update);
sale.delete('/sales/:id', saleController.remove);


module.exports = sale;
