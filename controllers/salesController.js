const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const order = req.body;
  const { status, newSale } = await salesService.createSale(order);
  res.status(status).json(newSale);
};

module.exports = {
  createSale,
};
