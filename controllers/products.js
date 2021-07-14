const rescue = require('express-rescue');
const services = require('../services/products');
const { CREATED, OK } = require('../constants/httpCodes.json');

const create = rescue(async (request, response, next) => {

  const { name, quantity } = request.body;

  const newProduct = await services.create({ name, quantity });

  if (newProduct.err) return next(newProduct);

  response.status(CREATED).json({
    _id: newProduct,
    name,
    quantity,
  });
});

const getAll = rescue(async (_request, response, next) => {

  const products = await services.getAll();

  if(products.err) return next(products);

  response.status(OK).json({
    products,
  });
});

const findById = rescue(async (request, response, next) => {

  const { id } = request.params;

  const product = await services.findById(id);

  if(product.err) return next(product);

  response.status(OK).json(product);
});

const update = rescue(async (request, response, next) => {

  const { id } = request.params;

  const { name, quantity } = request.body;

  const product = await services.update({id, name, quantity});

  if (product.err) return next(product);

  response.status(OK).json(product);
});

const del = rescue(async (request, response, next) => {

  const { id } = request.params;

  const deleted = await services.del(id);

  if (deleted.err) return next(deleted);

  response.status(OK).json(deleted);
});

module.exports = {
  create,
  getAll,
  findById,
  update,
  del,
};