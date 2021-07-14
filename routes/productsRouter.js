const express = require('express');

const controller = require('../controllers/productsControler');
const { checkiD } = require('../middlewares');

const router = express.Router();

router.post('/', controller.postNewProduct);

router.get(['/', '/:id'], checkiD, controller.getProducts);

module.exports = router;