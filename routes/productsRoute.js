const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const { validateProductInput, validateId } = require('../middlewares/index');

// 1 - Crie um endpoint para o cadastro de produtos
router.post('/', validateProductInput, productsController.postNewProduct);

// 2 - Crie um endpoint para listar os produtos
router.get(['/', '/:id'], validateId , productsController.getProducts);

// 3 - Crie um endpoint para atualizar um produto
router.put('/:id',validateId ,validateProductInput, productsController.updateProduct);

// 4 - Crie um endpoint para deletar um produto
router.delete('/:id', validateId, productsController.deleteProduct);

module.exports = router;
