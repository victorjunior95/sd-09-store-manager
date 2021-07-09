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

module.exports = {
  create,
  getAll,
};
