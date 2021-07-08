const express = require('express');
const mdwProducts = require('../middlewares/mdwProducts');

const productsRouter = express.Router();

productsRouter.get('/', mdwProducts.getAllProducts);
productsRouter.get('/:id', mdwProducts.verifyProductId, mdwProducts.getOneProduct);
productsRouter.post('/', mdwProducts.verifyProductBody, mdwProducts.postOneProduct);

module.exports = productsRouter ;