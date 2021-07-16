const express = require('express');
const salesController = require('../controllers/salesControler');

const checkSalesInput = require('../middlewares/checkSalesInput');

const router = express.Router();

router.post('/', checkSalesInput, salesController.postNewSale);




module.exports = router;