const router = require('express').Router();
const { products: productsController } = require('../controllers');

router.get('/:id', productsController.productsGetId);
router.get('/', productsController.productsIndex);
router.put('/:id', productsController.updateProduct);
router.post('/', productsController.productsCreate);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
