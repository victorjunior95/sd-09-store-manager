const service = require('../services/Sales');

async function newSale(req, res) {
  const sale = req.body;
  const { status, result } = await service.newSale(sale);
  return res.status(status).json(result);
}

module.exports = {
  newSale,
};
