const salesServices = require('../services/salesService');

const ok = 200;

const addSales = async (req, res, next) => {
  const { body } = req;
  const result = await salesServices.addSales(body);

  if (result.err) return next(result);

  res.status(ok).json(result);
};

module.exports = {
  addSales,
};
