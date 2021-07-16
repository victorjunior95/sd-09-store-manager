const {
  postProduct,
  getProducts,
  getProductById,
  putProduct,
  deleteProduct,
} = require('../controllers/products');

const express = require('express');
const router = express.Router();

router.post('/', postProduct);

router.delete('/:id', deleteProduct);

router.get('/:id', getProductById);
router.get('/', getProducts);

router.put('/:id', putProduct);

module.exports = router;
