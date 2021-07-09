const salesService = require('../services/salesService');

const STATUS_200 = 200;
const STATUS_422 = 422;

const create = async (req, res) => {
  const sale = await salesService.create(req.body);
  if (sale.err) return res.status(STATUS_422).json(sale);
  return res.status(STATUS_200).json(sale);
};

module.exports = {
  create,
};
