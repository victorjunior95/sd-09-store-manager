const express = require('express');
const router = express.Router();
const products = require('../controller/productsController');

router.post('/', products.registerNewProduct);

router.get('/', products.getProducts);

router.get('/:id', products.getProductById);

module.exports = router;