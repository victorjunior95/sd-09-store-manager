const express = require('express');

const ProductRouter = require('../controllers/ProductController');

const SalesRouter = require('../controllers/SalesController');

const router = express.Router();

router.use('/products', ProductRouter);

router.use('/sales', SalesRouter);

module.exports = router;