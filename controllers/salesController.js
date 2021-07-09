const route = require('express').Router();
const salesServices = require('../services/salesServices');

const OK = 200;
const CREATED = 201;

route.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = await salesServices.getById(id);
    return res.status(OK).json(sales);
  } catch (error) {
    return next(error);
  }
});

route.get('/', async (_req, res) => {
  const sale = await salesServices.getAll();
  return res.status(OK).json(sale);
});

route.post('/', async (req, res, next) => {
  try {
    const productAdd = await salesServices.add(req.body);
    return res.status(OK).json(productAdd);
  } catch (error) {
    return next(error);
  }
});

route.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const newSale = await salesServices.update(id, req.body);
    return res.status(OK).json(newSale);

  } catch (error) {
    return next(error);
  }
});

route.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const saleDeleted = await salesServices.exclude(id);

    res.status(OK).json(saleDeleted);
  } catch (error) {
    return next(error);
  }
});

module.exports = route;
