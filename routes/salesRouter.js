const express = require('express');
const checkSalesInput = require('../middlewares/checkSalesInput');

const router = express.Router();

router.post('/', checkSalesInput);




module.exports = router;