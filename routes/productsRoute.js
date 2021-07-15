const express = require('express');
const router = express.Router();
const products = require('../controller/productsController');

router.post('/', products.registerNewProduct);

module.exports = router;