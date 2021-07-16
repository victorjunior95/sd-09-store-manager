const salesService = require('../services/salesServices');

const registerSale = async (req, res) => {
  const sale = req.body;
  const response = await salesService.registerSale(sale);
  return res.status(response.status).json(response.message);
};

const getSales = async (req, res) => {
  const response = await salesService.getSales();
  return res.status(response.status).json(response.message);
}; 

module.exports = {
  registerSale,
  getSales
};