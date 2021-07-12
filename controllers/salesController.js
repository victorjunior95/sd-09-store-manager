const salesServices = require('../services/salesServices');

async function addSale(req, res) {
  const sale = req.body;
  const { status, result } = await salesServices.addSale(sale);
  return res.status(status).json(result);
}

async function getSaleById(req, res) {
  const { id } = req.params;
  const { status, result } = await salesServices.getSaleById(id);
  return res.status(status).json(result);
}

async function getSales(_req, res) {
  const { status, result } = await salesServices.getSales();
  return res.status(status).json(result);
}

async function updateSale(req, res) {
  const { id } = req.params;
  const sale = req.body;
  const { status, result } = await salesServices.updateSale(id, sale);
  return res.status(status).json(result);
}

module.exports = {
  addSale,
  getSaleById,
  getSales,
  updateSale,
};
