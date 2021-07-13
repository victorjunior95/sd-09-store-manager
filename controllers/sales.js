const rescue = require('express-rescue');
const services = require('../services/sales');
const { CREATED, OK } = require('../constants/httpCodes.json');

const create = rescue(async (request, response, next) => {

  const sale = request.body;

  const newSale = await services.create(sale);

  if (newSale.err) return next(newSale);

  response.status(CREATED).json(newSale);
});

module.exports = { create };
