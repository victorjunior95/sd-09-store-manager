const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.post('/', productController.create);

router.put('/:id', productController.updateById);

router.get('/:id', productController.getById);

router.get('/', productController.getAll);

router.delete('/:id', productController.deleteById);

module.exports = router;
