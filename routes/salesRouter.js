const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.salesCreation);


module.exports = router;