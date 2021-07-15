const { Router } = require('express');
const ProductController = require('../controllers/ProductController');
const SaleController = require('../controllers/SaleController');

const router = Router();

router.use('/products', ProductController);
router.use('/sales', SaleController);

module.exports = router;
