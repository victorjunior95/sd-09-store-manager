const express = require('express');
const {
  registerProduct,
  getAllProducts,
  getProductById
} = require('../controllers/productsController');

const router = express.Router();

router.post('/', registerProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

module.exports = router;