const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers');

router.use('/products', productsController);

module.exports = router;
