const express = require('express');
const productController  = require('../controllers/productController');
const salesController  = require('../controllers/salesController');

const router = express.Router();

router.use('/products', productController);
router.use('/sales', salesController);

module.exports = router;
