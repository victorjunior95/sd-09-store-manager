const express = require('express');

const router = express.Router();

const ProductsControllers = require('../controllers/ProductsController');

router.post('/', ProductsControllers.create);
router.get('/', ProductsControllers.getAll);

module.exports = router;