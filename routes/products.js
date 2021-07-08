const router = require('express').Router();
const { productsController } = require('../controllers');

router.post('/products', productsController.create);

module.exports = router;
