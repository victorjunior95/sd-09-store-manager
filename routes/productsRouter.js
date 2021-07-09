const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', productController.productInsert);

module.exports = router;