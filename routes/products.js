const router = require('express').Router();
const { productsController } = require('../controllers');

router.post('/products', productsController.create);

router.get('/products', productsController.getAll);

router.get('/products/:id', productsController.get);

router.put('/products/:id', productsController.update);

module.exports = router;
