const salesService = require('../services/salesServices');

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

const editSale = async (req, res) => {
  const { id } = req.params;
  const edit = req.body;
  const { status, editedSale } = await salesService.editSale(id, edit);
  res.status(status).json(editedSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, deletedSale } = await salesService.deleteSale(id);
  res.status(status).json(deletedSale);
};


module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  editSale,
  deleteSale,
};
