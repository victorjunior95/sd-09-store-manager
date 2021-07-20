const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', productController.productInsert);
router.get('/', productController.productsList);
router.get('/:id', productController.productDetail);
router.put('/:id', productController.productUpdate);

module.exports = router;