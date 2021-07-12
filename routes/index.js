const router = require('express').Router();
const products = require('./products');
const sales = require('./sales');

router.use('/', products);

router.use('/', sales);

module.exports = router;
