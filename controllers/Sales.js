const rescue = require('express-rescue');
const service = require('../services/Sales');

const OK = 200;

const registerSales = rescue(async (req, res, next) => {

  const newSales = await service.registerSales(req.body);

  if (newSales.err) return next(newSales.err);

  return res.status(OK).json(newSales);
});

module.exports = {
  registerSales,
};
