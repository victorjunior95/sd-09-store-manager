const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const SalesController = require('../controllers/SalesController');

const router = express.Router();

router.use('/products', ProductsController);
router.use('/sales', SalesController);


module.exports = router;