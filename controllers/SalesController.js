const SalesService = require('../services/SalesService');
const statusSucess = 200;

const getAllSales = async (_req, res, _next) => {
  const allSales = await SalesService.getAllSales();

  return res.status(statusSucess).json({ sales: allSales });
};

const findById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await SalesService.findById(id);

  if (sale.err) return next(sale.err);

  return res.status(statusSucess).json(sale);
};

const addSale = async (req, res, _next) => {
  const { body } = req;

  const sale = await SalesService.addSale(body);

  return res.status(statusSucess).json(sale);
};

const editSale = async (req, res, _next) => {
  const { id } = req.params;
  const { body } = req;

  const newSale = await SalesService.editSale(id, body);

  return res.status(statusSucess).json(newSale);
};

const deleteSale = async (req, res, _next) => {
  const { id } = req.params;

  const deleteProduct = await SalesService.deleteSale(id);

  return res.status(statusSucess).json(deleteProduct);
};

module.exports = {
  getAllSales,
  findById,
  addSale,
  editSale,
  deleteSale
};

