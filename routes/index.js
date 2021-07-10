const routes = require('express').Router();
const rescue = require('express-rescue');

const products = require('../controllers/productsController');
const sales = require('../controllers/salesController');

//Products
routes.post('/products', products.create);
routes.get('/products', products.findAll);
routes.get('/products/:id', products.findById);
routes.put('/products/:id', products.update);
routes.delete('/products/:id', products.exclude);

//Sales
routes.post('/sales/', rescue(sales.create));
routes.get('/sales/', rescue(sales.findAll));
routes.get('/sales/:id', rescue(sales.findById));
routes.put('/sales/:id', rescue(sales.update));

module.exports = routes;