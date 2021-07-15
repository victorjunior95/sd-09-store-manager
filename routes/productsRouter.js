const express = require('express');

const controller = require('../controllers/productsControler');
const { checkiD, checkNewProductInfo, checkifAlreadyExists } = require('../middlewares');

const router = express.Router();

router.post('/', checkifAlreadyExists, checkNewProductInfo, controller.postNewProduct);

router.get(['/', '/:id'], checkiD, controller.getProducts);

router.put('/:id', checkiD, checkNewProductInfo, controller.updateProduct);

module.exports = router;