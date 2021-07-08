const SalesService = require('../services/salesService');
const { OK } = require('../httpCodes');

const create = async (req, res) => {
  const data = req.body;

  const sale = await SalesService.create(data);

  return res.status(OK).json(sale);
};

const getAll = async (_req, res) => {
  const sales = await SalesService.getAll();

  return res.status(OK).json(sales);
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await SalesService.findById(id);

  return sale.err
    ? next(sale.err)
    : res.status(OK).json(sale);
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const { productId, quantity } = req.body[0];

  const sale = await SalesService.updateById(id, { productId, quantity });

  return res.status(OK).json(sale);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await SalesService.deleteById(id);

  return sale.err
    ? next(sale.err)
    : res.status(OK).json(sale);
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
