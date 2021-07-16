const express = require('express');
const salesController = require('../controllers/salesControler');

const checkIfSalesExist = require('../middlewares/checkIfSalesExist');
const checkSalesInput = require('../middlewares/checkSalesInput');
const salesNotExistError = require('../middlewares/saleDeleteMidW');

const router = express.Router();

router.post('/', checkSalesInput, salesController.postNewSale);

router.get(['/', '/:id'], checkIfSalesExist, salesController.getSales);

router.put('/:id', checkSalesInput, salesController.upDateSale);

router.delete('/:id', salesNotExistError, salesController.deleteSale);

module.exports = router;