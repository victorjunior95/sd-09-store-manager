const express = require('express');
const ProductsRouter = require('../controllers/ProductsControllers');
const router = express.Router();

router.use('/products', ProductsRouter);

module.exports = router;
