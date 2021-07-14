const rescue = require('express-rescue');
const services = require('../services/sales');
const { OK } = require('../constants/httpCodes.json');

const create = rescue(async (request, response, next) => {

  const sale = request.body;

  const newSale = await services.create(sale);

  if (newSale.err) return next(newSale);

  response.status(OK).json(newSale);
});

module.exports = { create };
