const rescue = require('express-rescue');
const services = require('../services/sales');
const { CREATED, OK } = require('../constants/httpCodes.json');

const create = rescue(async (request, response, next) => {

  const sales = request.body;

  const newProduct = await services.create({ name, quantity });

  if (newProduct.err) return next(newProduct);

  response.status(CREATED).json({
    _id: newProduct,
    name,
    quantity,
  });
});

module.exports = { create };
