const express = require('express');

const ProductRouter = require('../controllers/ProductController');

const router = express.Router();

router.use('/products', ProductRouter);

module.exports = router;