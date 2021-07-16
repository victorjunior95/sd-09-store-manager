const express = require('express');
const productController = require('../controllers/productController');
const productRoute = express.Router();

// cria novo produto
productRoute.post('/', productController.createNewProduct);

// lista todos produtos
productRoute.get('/', productController.listAllProducts);

// procura produto por id
productRoute.get('/:id', productController.findProductById);

// atualiza produto
productRoute.put('/:id', productController.updateProductData);

// deleta produto
productRoute.delete('/:id', productController.deleteProductData);

module.exports = productRoute;
