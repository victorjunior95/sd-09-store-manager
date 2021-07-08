const express = require('express');
const ProductsController = require('../controllers/ProductsController');

const router = express.Router();

router.post('/products', ProductsController.addNewProduct);
router.get('/products/:id', ProductsController.listProduct);
router.get('/products', ProductsController.listProduct);
router.put('/products/:id', ProductsController.updateProduct);

module.exports = router;