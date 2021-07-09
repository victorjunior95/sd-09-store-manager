const {
  createSale,
  listAllSales,
  findOneSale,
  updateSale,
  deleteSale,
} = require('../services/salesService');
const { ok } = require('../services/httpStatusCode');

async function postSale(req, res, _next) {
  const sale = req.body;
  const result = await createSale(sale);
  res.status(ok).json(result);
}

async function getAllSales(_req, res, _next) {
  const result = await listAllSales();
  res.status(ok).json(result);
}

async function getOneSale(req, res, _next) {
  const { id } = req.params;
  const result  = await findOneSale(id);
  res.status(ok).json(result);
}

async function updateOneSale(req, res, _next) {
  const { id } = req.params;
  const sale = req.body;
  const result = await updateSale(id, sale);
  res.status(ok).json(result);
}

async function deleteOneSale(req, res, _next) {
  const { id } = req.params;
  const result = await deleteSale(id);
  res.status(ok).json(result);
}

module.exports = {
  postSale,
  getAllSales,
  getOneSale,
  updateOneSale,
  deleteOneSale,
};
