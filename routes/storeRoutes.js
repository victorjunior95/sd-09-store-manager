const express = require('express');
const productController = require('../controllers/productController');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

router.post('/sales', salesController.newSale);
router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSaleById);
router.put('/sales/:id', salesController.updateSale);
router.delete('/sales/:id', salesController.deleteSale);

module.exports = router;