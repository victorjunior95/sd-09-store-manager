const express = require('express');
const ProductsController = require('../controllers/ProductsController');

const router = express.Router();

router.post('/products', ProductsController.addNewProduct);
router.get('/products/:id', ProductsController.listProduct);
router.get('/products', ProductsController.listProduct);
router.put('/products/:id', ProductsController.updateProduct);
router.delete('/products/:id', ProductsController.deleteProduct);

module.exports = router;