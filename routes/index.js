const routes = require('express').Router();

const products = require('../controllers/productsController');

routes.post('/products', products.create);
routes.get('/products', products.findAll);
routes.get('/products/:id', products.findById);
routes.put('/products/:id', products.update);


module.exports = routes;