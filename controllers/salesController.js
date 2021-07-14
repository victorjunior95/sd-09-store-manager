const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const order = req.body;
  const { status, newSale } = await salesService.createSale(order);
  res.status(status).json(newSale);
};

const getAllSales = async (_req, res) => {
  const { status, sales } = await salesService.getAllSales();
  res.status(status).json({ sales: sales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { status, sale } = await salesService.getSaleById(id);
  res.status(status).json(sale);
};


module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
