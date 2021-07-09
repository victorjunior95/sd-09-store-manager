const express = require('express');
const products = require('../controllers/products');
const { checkProduct, findProduct, checkId } = require('../middlewares/validators');

const route = express.Router();

route.post('/', checkProduct, findProduct, products.create);
route.get('/', products.getAll);
route.get('/:id', checkId, products.getById);
route.put('/:id', checkProduct, products.update);
route.delete('/:id', checkId, products.remove);

module.exports = route;
