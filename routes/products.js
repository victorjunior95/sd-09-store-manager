const router = require('express').Router();
const { productsController } = require('../controllers');

router.post('/products', productsController.create);

router.get('/products', productsController.getAll);

router.get('/products/:id', productsController.get);

module.exports = router;
