const express = require('express');
const ProductController = require('../controllers/productController');
const checkMiddleware = require('../middlewares/checkMiddleware');
const router = express.Router();

router.post('/', checkMiddleware, ProductController.create);

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.findById);

router.put('/:id', checkMiddleware, ProductController.updateById);

router.delete('/:id', ProductController.deleteById);

module.exports = router;
