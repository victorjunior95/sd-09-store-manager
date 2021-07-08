const express = require('express');
const router = express.Router();

const salesController = require('../controllers/salesController');
const { validateSalesInput, validateSaleId } = require('../middlewares/index');

// 5 - Crie um endpoint para cadastrar vendas
router.post('/', validateSalesInput, salesController.postNewSale);

// 6 - Crie um endpoint para listar as vendas
router.get(['/', '/:id'], salesController.getSales);

// 7 - Crie um endpoint para atualizar uma venda
router.put('/:id', validateSaleId, validateSalesInput, salesController.updateSale);

// 8 - Crie um endpoint para deletar uma venda
router.delete('/:id', validateSaleId, salesController.deleteSale);

module.exports = router;
