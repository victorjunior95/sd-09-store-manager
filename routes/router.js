const express = require('express');
const ProductsController = require('../controllers/ProductsController');

const router = express.Router();

router.use('/products', ProductsController);
//router.use('/sales', SalesController);  rota de vendas a ser implementada posteriormente....

module.exports = router;