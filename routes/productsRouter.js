const { Router } = require('express');

const productsController = require('../controllers/productsController');

const router = Router();

router.get('/', productsController.findAll);
router.post('/', productsController.createProducts);


module.exports = router;
