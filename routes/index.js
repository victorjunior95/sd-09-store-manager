const routes = require('express').Router();

const products = require('../controllers/productsController');
const sales = require('../controllers/salesController');

routes.post('/products', products.create);
routes.get('/products', products.findAll);
routes.get('/products/:id', products.findById);
routes.put('/products/:id', products.update);
routes.delete('/products/:id', products.exclude);

routes.post('/sales/', sales.create);

module.exports = routes;