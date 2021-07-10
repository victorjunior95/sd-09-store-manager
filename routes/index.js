const routes = require('express').Router();
const rescue = require('express-rescue');

const products = require('../controllers/productsController');
const sales = require('../controllers/salesController');

//Products
routes.post('/products', rescue(products.create));
routes.get('/products', rescue(products.findAll));
routes.get('/products/:id', rescue(products.findById));
routes.put('/products/:id', rescue(products.update));
routes.delete('/products/:id', rescue(products.exclude));

//Sales
routes.post('/sales/', rescue(sales.create));
routes.get('/sales/', rescue(sales.findAll));
routes.get('/sales/:id', rescue(sales.findById));
routes.put('/sales/:id', rescue(sales.update));
routes.delete('/sales/:id', rescue(sales.exclude));

module.exports = routes;
