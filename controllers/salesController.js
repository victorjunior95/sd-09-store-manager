const route = require('express').Router();
const salesServices = require('../services/salesServices');

const OK = 200;
const CREATED = 201;

route.post('/', async (req, res, next) => {
  try {
    const productAdd = await salesServices.add(req.body);
    return res.status(OK).json(productAdd);
  } catch (error) {
    return next(error);
  }
});

module.exports = route;
