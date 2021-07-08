const ServiceSales = require('../services/ServiceSales');

const SUCCESS = 200;

const create = async (req, res, _next) => {
  const itensSold = req.body;

  const test = await ServiceSales.create(itensSold);

  res.status(SUCCESS).json(test);
};

module.exports = {
  create,
};
