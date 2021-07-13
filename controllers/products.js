const express = require('express');
const services = require('../services/products');
const { status } = require('../schema/status');
const { validateName, validateQuantity, validateId } =
 require('../middlewares/productsValidation');

const routes = express.Router();
// Req 1 => Cria a rota
routes.post('/', validateName, validateQuantity, async (req, res) => {
  const { name, quantity } = req.body;
  const createdProduct = await services.create(name, quantity);
  if (createdProduct.isError) return res.status(createdProduct.status)
    .json({ err: { code: createdProduct.code, message: createdProduct.message} });
  return res.status(status.created).json(createdProduct);
});

// Req 2 
routes.get('/', async (_req, res) => {
  const products = await services.findAll();
  return res.status(status.OK).json({ products });
});
// Req 2
routes.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const product = await services.findById(id);
  return res.status(status.OK).json(product);
});

module.exports = routes;
