const express = require('express');
const products = require('../controllers/products');
const { checkProd, findProd, checkId } = require('../middlewares/validators');

const route = express.Router();

route.post('/', checkProd, findProd, products.create);
route.get('/', products.getAll);
route.get('/:id', checkId, products.getById);
route.put('/:id', checkProd, products.update);
route.delete('/:id', checkId, products.remove);

module.exports = route;
