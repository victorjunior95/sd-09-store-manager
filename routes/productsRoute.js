const express = require('express');
const registerProduct = require('../controllers/productsController');

const router = express.Router();

router.post('/', registerProduct);

module.exports = router;