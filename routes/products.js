const router = require('express').Router();
const { productsController } = require('../controllers');

router.post('/products', productsController.create);

router.get('/products', productsController.getAll);

module.exports = router;
