const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { validateSalesInput } = require('../middlewares/index');
// 5 - Crie um endpoint para cadastrar vendas
const statusOK = 200;

router.post('/', validateSalesInput, salesController.postNewSale);

module.exports = router;
