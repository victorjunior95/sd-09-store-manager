const router = require('express').Router();
const { products: productsController } = require('../controllers');

router.get('/:id', productsController.productsGetId);
router.get('/', productsController.productsIndex);
router.post('/', productsController.productsCreate);

module.exports = router;
