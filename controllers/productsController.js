const express = require('express');
const productsService = require('../services/ProductsService');

const ProductsRouter = express.Router();

const HTTP_SERVERERROR_STATUS = 500;

ProductsRouter.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await productsService.create(name, quantity);

    if (newProduct.err)
      return res.status(newProduct.status).json({ err: newProduct.err});

    return res.status(newProduct.status).json(newProduct.product);
  } catch (err) {
    return res.status(HTTP_SERVERERROR_STATUS).json(err);
  }
});

// no router já esta no /products aqui fica como se fosse
// /product/
ProductsRouter.get('/', async (_req, res) => {
  try {
    const productsAll = await productsService.listAll();
    return res.status(productsAll.status).json(productsAll.products);
  } catch (err) {
    return res.status(HTTP_SERVERERROR_STATUS).json(err);
  }
});

module.exports = ProductsRouter;
