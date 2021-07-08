const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.use('/products', productsController);

module.exports = router;