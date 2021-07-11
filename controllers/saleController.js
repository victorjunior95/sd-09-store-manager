const saleService = require('../services/saleService');

const STATUS_HTTP_200 = 200;
const STATUS_HTTP_404 = 404;
const STATUS_HTTP_422 = 422;

const create = async (req, res) => {
  const sales = req.body;
  const result = await saleService.create(sales);

  if (!result.err) {
    return res.status(STATUS_HTTP_200).json(result);
  };

  return res.status(STATUS_HTTP_422).json(result);
};

const getAll = async (req, res) => {
  const sales = await saleService.getAll();
  return res.status(STATUS_HTTP_200).json(sales);
};

const findById = async (req, res) => {
  const sale = await saleService.findById(req.params.id);

  if (!sale.err) {
    return res.status(STATUS_HTTP_200).json(sale);
  };

  return res.status(STATUS_HTTP_404).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const result = await saleService.update(id, sale);

  if (!result.err) {
    return res.status(STATUS_HTTP_200).json(result);
  };

  return res.status(STATUS_HTTP_422).json(result);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.exclude(id);

  if (!sale.err) {
    return res.status(STATUS_HTTP_200).json(sale);
  };

  return res.status(STATUS_HTTP_422).json(sale);
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
};
