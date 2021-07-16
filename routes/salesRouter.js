const { Router } = require('express');

const salesController = require('../controllers/salesController');

const router = Router();

router.route('/').post(salesController.createSales);

module.exports = router;
