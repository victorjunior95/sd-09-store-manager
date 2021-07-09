const { Router } = require('express');
const ProductController = require('../controllers/ProductController');

const router = Router();

router.use('/products', ProductController);

module.exports = router;
