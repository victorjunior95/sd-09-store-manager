const { Router } = require('express');

const productsController = require('../controllers/productsController');

const router = Router();

router.route('/')
  .get(productsController.findAll)
  .post(productsController.createProducts);


module.exports = router;
