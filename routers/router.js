const express = require('express');
const ProductsRouter = require('../controllers/ProductsControllers');
const SalesRouter = require('../controllers/SalesControllers');
const router = express.Router();

router.use('/products', ProductsRouter);
router.use('/sales', SalesRouter);

module.exports = router;
