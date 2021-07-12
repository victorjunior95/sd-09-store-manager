const express = require('express');
const ProductsRouter = require('./ProductsRouter');

const router = express.Router();

router.use('/products', ProductsRouter);

module.exports = router;
