const express = require('express');
const rescue = require('express-rescue');
const validateProduct = require('../middlewares/productValidator');

const { OK, CREATED } = require('../utils/httpStatusCodes');
const productServices = require('../services/productServices');

const productController = express.Router();

productController.get('/', rescue(async (_req, res) => {
  const products = await productServices.findAll();

  res.status(OK).json({ products }); 
}));

productController.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productServices.findById(id);

  res.status(OK).json(product); 
}));

productController.post('/', validateProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productServices.create(name, quantity);

  return res.status(CREATED).json(newProduct);
}));

productController.put('/:id', validateProduct, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await productServices.update(id, name, quantity);

  return res.status(OK).json( updatedProduct );
}));

module.exports = productController;
