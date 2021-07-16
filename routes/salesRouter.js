const express = require('express');
const salesController = require('../controllers/salesControler');
const checkIfSalesExist = require('../middlewares/checkIfSalesExist');

const checkSalesInput = require('../middlewares/checkSalesInput');

const router = express.Router();

router.post('/', checkSalesInput, salesController.postNewSale);

router.get(['/', '/:id'], checkIfSalesExist, salesController.getSales);

module.exports = router;