const express = require('express');
const router = express.Router();
const sales = require('../controller/salesController');

// router.post('/', products.registerNewProduct);

router.post('/', sales.registerSale);

router.get('/', sales.getSales);

router.get('/:id', sales.getSaleById);

// router.put('/:id', products.updateProductById);

// router.delete('/:id', products.deleteProductById);

module.exports = router;