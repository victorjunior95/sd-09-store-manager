const express = require('express');
const productsService = require('../services/ProductsService');

const ProductsRouter = express.Router();

const HTTP_NOTPROCESS_STATUS = 422;

ProductsRouter.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await productsService.create(name, quantity);

    if (newProduct.err)
      return res.status(newProduct.status).json({ err: newProduct.err});

    return res.status(newProduct.status).json(newProduct.product);
  } catch (err) {
    return res.status(HTTP_NOTPROCESS_STATUS).json(err);
  }
});

module.exports = ProductsRouter;
