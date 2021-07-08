const route = require('express').Router();
const productsServices = require('../services/productsServices');

const CREATED = 201;
const OK = 200;

route.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const products = await productsServices.getById(id, next);
    return res.status(OK).json(products);
  } catch (error) {
    return next(error);
  }
});

route.get('/', async (_req, res) => {
  const products = await productsServices.getAll();
  return res.status(OK).json(products);
});

route.post('/', async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const product = await productsServices.add(name, quantity, next);
    return res.status(CREATED).json(product);
  } catch (error) {
    return next(error);
  }
});

route.put('/:id', async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const newProduct = await productsServices.update(id, name, quantity);
    return res.status(OK).json(newProduct);

  } catch (error) {
    return next(error);
  }
});

route.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const productDeleted = await productsServices.exclude(id);

    res.status(OK).json(productDeleted);
  } catch (error) {
    return next(error);
  }
});

module.exports = route;
