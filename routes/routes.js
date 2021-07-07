const express = require('express');
const ProductsController = require('../controllers/ProductsController');

const router = express.Router();

router.post('/products', ProductsController.addNewProduct);

module.exports = router;