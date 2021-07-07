const route = require('express').Router();
const productsServices = require('../services/productsServices');

const CREATED = 201;
const ok = 200;

route.post('/', async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await productsServices.add(name, quantity, next);
  res.status(CREATED).json(product);
});

route.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const products = await productsServices.getById(id, next);
  return res.status(ok).json(products);
});

route.get('/', async (_req, res) => {
  const products = await productsServices.getAll();
  return res.status(ok).json(products);
});

module.exports = route;
