const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/', productController.productInsert);
router.get('/');
router.get('/:id');

module.exports = router;