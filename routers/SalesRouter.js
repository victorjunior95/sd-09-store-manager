const express = require('express');
const SalesController = require('../controllers/SalesController');

const checkIfSalesExist = require('../middlewares/checkIfSalesExist');
const checkSalesInput = require('../middlewares/checkSalesInput');
const salesNotExistError = require('../middlewares/saleDeleteMidW');



const SalesRouter = express.Router();

SalesRouter.get(['/', '/:id'], checkIfSalesExist, SalesController.getAllSales);

SalesRouter.post('/', checkSalesInput, SalesController.addSale);

SalesRouter.put('/:id', checkSalesInput, SalesController.editSale);

SalesRouter.delete('/:id', salesNotExistError, SalesController.deleteSale);

module.exports = SalesRouter;
