const express = require('express');

const controller = require('../controllers/productsControler');
const { checkiD, checkNewProductInfo } = require('../middlewares');

const router = express.Router();

router.post('/', checkNewProductInfo, controller.postNewProduct);

router.get(['/', '/:id'], checkiD, controller.getProducts);

module.exports = router;