const salesService = require('../services/Sales');
const rescue = require('express-rescue');

const createSale = rescue(async (req, res) => {
  const sales = req.body;
  const response = await salesService.createSale(sales);
  return res.status(response.code).json(response.result);
});

module.exports = { createSale };