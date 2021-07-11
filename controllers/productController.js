const express = require('express');
const rescue = require('express-rescue');
const validateProduct = require('../middlewares/productValidator');

const { ok, created } = require('../utils/httpStatusCodes');
const productServices = require('../services/productServices');

const productController = express.Router();

productController.get('/', rescue(async (_req, res) => {
  const products = await productServices.findAll();

  res.status(ok).json({ products }); 
}));

productController.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productServices.findById(id);

  res.status(ok).json(product); 
}));

productController.post('/', validateProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productServices.create(name, quantity);

  return res.status(created).json(newProduct);
}));

productController.put('/:id', validateProduct, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await productServices.update(id, name, quantity);

  return res.status(ok).json( updatedProduct );
}));

productController.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await productServices.exclude(id);

  return res.status(ok).json( deletedProduct );
}));

module.exports = productController;
