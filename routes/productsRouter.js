const { Router } = require('express');

const productsController = require('../controllers/productsController');
//const productsModel = require('../models/products/productsModel');

const router = Router();

// console.log('router');

router.get('/', productsController.findAll);
router.post('/', productsController.createProducts);


module.exports = router;
