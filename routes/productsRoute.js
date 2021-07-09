const express = require('express');
const {
  registerProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require('../controllers/productsController');

const router = express.Router();

router.post('/', registerProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put('/:id', updateProduct);

module.exports = router;