const express = require('express');
const rescue = require('express-rescue');
const validateProduct = require('../middlewares/productValidator');

const { OK, CREATED } = require('../utils/httpStatusCodes');
const productServices = require('../services/productServices');

const productController = express.Router();

productController.get('/', (_req, res) => { res.status(OK).send('teste ok'); });

productController.post('/', validateProduct, rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productServices.create(name, quantity);

  return res.status(CREATED).json(newProduct);
}));

module.exports = productController;
