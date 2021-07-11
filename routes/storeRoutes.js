const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.createProduct);

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProductById);

router.put('/products/:id', productController.updateProduct);

module.exports = router;