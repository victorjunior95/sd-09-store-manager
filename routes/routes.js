const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const SaleController = require('../controllers/SalesController');

const router = express.Router();

router.post('/products', ProductsController.addNewProduct);
router.get('/products/:id', ProductsController.listProduct);
router.get('/products', ProductsController.listProduct);
router.put('/products/:id', ProductsController.updateProduct);
router.delete('/products/:id', ProductsController.deleteProduct);
router.post('/sales', SaleController.addNewSale);
router.get('/sales/:id', SaleController.listSale);
router.get('/sales', SaleController.listSale);
router.put('/sales/:id', SaleController.updateSale);
router.delete('/sales/:id', SaleController.deleteSale);

module.exports = router;