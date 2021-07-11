const express = require('express');

const router = express.Router();

const ProductsControllers = require('../controllers/ProductsController');

router.post('/', ProductsControllers.create);
router.get('/', ProductsControllers.getAll);
router.get('/:id', ProductsControllers.getById);
router.put('/:id', ProductsControllers.updateOne);
router.delete('/:id', ProductsControllers.deleteProduct);

module.exports = router;