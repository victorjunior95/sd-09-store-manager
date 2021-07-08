const express = require('express');
const router = express.Router();

const salesController = require('../controllers/salesController');
const { validateSalesInput, validateId } = require('../middlewares/index');

// 5 - Crie um endpoint para cadastrar vendas
router.post('/', validateSalesInput, salesController.postNewSale);

// 6 - Crie um endpoint para listar as vendas
router.get(['/', '/:id'], validateId, salesController.getSales);

// 7 - Crie um endpoint para atualizar uma venda
router.put('/:id', validateId, validateSalesInput, salesController.updateSale);

module.exports = router;
