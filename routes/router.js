const { Router } = require('express');
const ProductController = require('../controllers/productsController');
const SaleController = require('../controllers/salesController');

const router = Router();

router.use('/products', ProductController);
router.use('/sales', SaleController);

module.exports = router;
