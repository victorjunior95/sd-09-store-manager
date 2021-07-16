const service = require('../services/Sales');

async function newSale(req, res) {
  const sale = req.body;
  const { status, result } = await service.newSale(sale);
  return res.status(status).json(result);
}

async function fetchSales(_req, res) {
  const { status, result } = await service.fetchSales();
  return res.status(status).json(result);
}

async function findById(req, res) {
  const { id } = req.params;
  const { status, result } = await service.findById(id);
  return res.status(status).json(result);
}

async function updateSale(req, res) {
  const { id } = req.params;
  const sale = req.body;
  const { status, result } = await service.updateProduct(id, sale);
  return res.status(status).json(result);
}

async function deleteSale(req, res) {
  const { id } = req.params;
  const { status, result } = await service.deleteSale(id);
  return res.status(status).json(result);
}

module.exports = {
  newSale,
  fetchSales,
  findById,
  updateSale,
  deleteSale,
};
