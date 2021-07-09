const express = require('express');

const ProductService = require('../services/ProductService');

const ProductRouter = express.Router();

const CREATED= 201;

ProductRouter.post('/', async(req,res) => {
  const { name, quantity } = req.body;
  try{
    const newProduct = await ProductService.createProduct(name, quantity);
    return res.status(CREATED).json(newProduct);
  } catch (error) {
    return res.status(error.status).json(error.error);
  }
});

module.exports = ProductRouter;