const express = require('express');

const {
  salesRegister,
} = require('../controllers/salesControlles');

const router = express.Router();

router.post('/', salesRegister);

module.exports = router;
