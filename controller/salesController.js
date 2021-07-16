const salesService = require('../services/salesServices');

const registerSale = async (req, res) => {
  const sale = req.body;
  const response = await salesService.registerSale(sale);
  return res.status(response.status).json(response.message);
};

module.exports = {
  registerSale
};