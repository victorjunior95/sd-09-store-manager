const { Router } = require('express');

const productsController = require('../controllers/productsController');
const { validateProducts } = require('../middlewares/productsMiddlewares');

const router = Router();

router.route('/')
  .get(productsController.findAll)
  .post(validateProducts, productsController.createProducts);

router.route('/:id')
  .get(productsController.findOne);

module.exports = router;
