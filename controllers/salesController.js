const salesService = require('../services/salesService');

const STATUS_200 = 200;
const STATUS_404 = 404;
const STATUS_422 = 422;

const create = async (req, res) => {
  const sale = await salesService.create(req.body);
  if (sale.err) return res.status(STATUS_422).json(sale);
  return res.status(STATUS_200).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(STATUS_200).json({ sales: sales });
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSale(id);
  if (sale.err) return res.status(STATUS_404).json(sale);
  return res.status(STATUS_200).json(sale);
};

module.exports = {
  create,
  getAll,
  getSale,
};
