const express = require('express');

const ProductService = require('../services/ProductService');

const ProductRouter = express.Router();

const CREATED= 201;

const STATUS_OK = 200;

ProductRouter.post('/', async (req,res) => {
  const { name, quantity } = req.body;
  try{
    const newProduct = await ProductService.createProduct(name, quantity);
    return res.status(CREATED).json(newProduct);
  } catch (error) {
    return res.status(error.status).json(error.error);
  }
});

ProductRouter.get('/', async (_req, res) => {
  try {
    const product = await ProductService.findAllProducts();
    return res.status(STATUS_OK).json(product);
  } catch (error) {
    return res.status(error.status).json(error.error);
  }
});

ProductRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductService.findById(id);
    return res.status(STATUS_OK).json(product);
  } catch (error) {
    return res.status(error.status).json(error.error);
  }
});

ProductRouter.put('/:id', async (req,res) => {
  const { id } = req.params;  
  const { name, quantity } = req.body;
  try {
    const newProduct = await ProductService.updateProduct(id, name, quantity);
    return res.status(STATUS_OK).json(newProduct);
  } catch (error) {
    return res.status(error.status).json(error.error);
  }

});

ProductRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const deleted = await ProductService.deleteProduct(id);
    return res.status(STATUS_OK).json(deleted);
  } catch (error) {
    return res.status(error.status).json(error.error);
  }
});

module.exports = ProductRouter;