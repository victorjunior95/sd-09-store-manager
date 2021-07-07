const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const { validateProductInput } = require('../middlewares/index');

router.post('/', validateProductInput, productsController.postNewProduct);

router.get('/', productsController.getAllProducts);

router.get('/:id',productsController.getProductById);

module.exports = router;
