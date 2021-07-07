const express = require('express');
const mdwProducts = require('../middlewares/mdwProducts');

const productsRouter = express.Router();

productsRouter.post('/', mdwProducts.postOneProduct);

module.exports = productsRouter ;