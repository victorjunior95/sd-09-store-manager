const express = require('express');
const mdwProducts = require('../middlewares/mdwProducts');

const productsRouter = express.Router();

productsRouter.get('/', mdwProducts.getAllProducts);
productsRouter.get('/:id', mdwProducts.verifyProductId, mdwProducts.getOneProduct);
productsRouter.post('/', mdwProducts.verifyProductBody, mdwProducts.postOneProduct);
productsRouter.put('/:id',
  mdwProducts.verifyProductId,
  mdwProducts.verifyProductBody,
  mdwProducts.putOneProduct);
productsRouter.delete('/:id', mdwProducts.verifyProductId, mdwProducts.deleteOneProduct);

module.exports = productsRouter ;
