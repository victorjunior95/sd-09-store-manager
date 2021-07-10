const express = require('express');
const router = express.Router();
const {
  productsController,
  salesController,
} = require('../controllers');

router.use('/products', productsController);
router.use('/sales', salesController);

module.exports = router;
