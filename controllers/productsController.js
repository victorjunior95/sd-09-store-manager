const express = require('express');
const productsService = require('../services/productService');

const productRouter = express.Router();

const { code: { created, unprocessable_entity } } = require('../utils');

productRouter.post('/', async (req, res) => {
    const { name, quantity } = req.body;
    const newProduct = await productsService.create(name, quantity);

    if (newProduct.err) return res.status(unprocessable_entity).json(newProduct);
    return res.status(created).json(newProduct);
});

module.exports = productRouter;
