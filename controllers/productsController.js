const express = require('express');
const productsService = require('../services/productService');

const productRouter = express.Router();

const { code: { created, unprocessable_entity } } = require('../utils');

console.log('productController'); // Passou aqui

productRouter.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    console.log('productRouter name-quantity', name, quantity); // Passou aqui

    const newProduct = await productsService.create(name, quantity);
    console.log('newProduct', newProduct); // NÂO passou aqui

    return res.status(created).json(newProduct);
  } catch (err) {
    return res.status(unprocessable_entity).json(err);
  }
});

module.exports = productRouter;
