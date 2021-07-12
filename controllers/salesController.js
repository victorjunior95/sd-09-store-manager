const salesServices = require('../services/salesServices');

async function addSale(req, res) {
  const sale = req.body;
  const { status, result } = await salesServices.addSale(sale);
  return res.status(status).json(result);
}

module.exports = {
  addSale,
};
