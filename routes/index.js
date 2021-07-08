const routes = require('express').Router();

const products = require('../controllers/productsController');

routes.post('/products', products.create);

module.exports = routes;