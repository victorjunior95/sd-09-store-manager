const express = require('express');
const services = require('../services/products');

const { status } = require('../schema/status');
const { validateName, validateQuantity } = require('../middlewares/productsValidation');

const routes = express.Router();
// Req 1 => Crio a rota, com validações
routes.post('/', validateName, validateQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  // 1 => Se Criação no próprio BD usando o 'S'
  const createdProduct = await services.create(name, quantity);
  if (createdProduct.isError) return res.status(createdProduct.status)
    .json({ err: { code: createdProduct.code, message: createdProduct.message} });
  return res.status(status.created).json(createdProduct);
});

module.exports = routes;
