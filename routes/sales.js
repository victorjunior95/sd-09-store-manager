const express = require('express');
const sales = require('../controllers/sales');
const { checkSale, findSale, checkSaleId, checkStock,
} = require('../middlewares/validators');

const route = express.Router();

route.post('/', checkSale, checkStock, sales.create);
route.get('/', sales.getAll);
route.get('/:id', findSale, sales.getById);
route.put('/:id', checkSale, sales.update);
route.delete('/:id', checkSaleId, sales.remove);

module.exports = route;
