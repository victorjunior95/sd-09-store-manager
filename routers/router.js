const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const SalesRouter = require('../controllers/SalesController');
const router = express.Router();

router.use('/products', ProductsController);
router.use('/sales', SalesRouter);
module.exports = router;
