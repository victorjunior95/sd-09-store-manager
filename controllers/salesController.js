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

const update = async (req, res) => {
  const { id } = req.params;
  const salesUpdate = await salesService.update(id, req.body);
  if (salesUpdate.err) return res.status(STATUS_422).json(salesUpdate);
  return res.status(STATUS_200).json(salesUpdate);
};

module.exports = {
  create,
  getAll,
  getSale,
  update,
};
