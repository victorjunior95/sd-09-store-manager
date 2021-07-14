const rescue = require('express-rescue');
const services = require('../services/sales');
const { OK } = require('../constants/httpCodes.json');

const create = rescue(async (request, response, next) => {

  const sale = request.body;

  const newSale = await services.create(sale);

  if (newSale.err) return next(newSale);

  response.status(OK).json(newSale);
});

const getAll = rescue(async (_request, response, next) => {
  const sales = await services.getAll();

  if(sales.err) return next(sales);

  response.status(OK).json({
    sales,
  });
});

const findById = rescue(async (request, response, next) => {

  const { id } = request.params;

  const sale = await services.findById(id);

  if(sale.err) return next(sale);

  response.status(OK).json(sale);
});

const update = rescue(async (request, response, next) => {

  const { id } = request.params;

  const products = request.body;

  const newSale = await services.update({ id, products });

  if (newSale.err) return next(newSale);

  response.status(OK).json(newSale);
});

const del = rescue(async (request, response, next) => {
  
  const { id } = request.params;

  const deletedSale = await services.delete(id);

  if(deletedSale.err) return next(deletedSale);

  response.status(OK).json(deletedSale);
});

module.exports = { create, getAll, findById, update, del };
