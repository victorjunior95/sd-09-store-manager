const { allSales, create, deleteService, getById,
  updateService  } = require('../services/salesService');

const createSales = async (req, res, _next) => {
  const newSales = req.body;
  const { status, result } = await create(newSales);
  return res.status(status).json(result);
};

const getAllSales = async (_req, res, _next) => {
  const { status, result } = await allSales();
  return res.status(status).json(result);
};

const getByIdSale = async (req, res, _next) => {
  const { id } = req.params;
  const { status, result } = await getById(id);
  return res.status(status).json(result);
};

const updateSale = async (req, res, _next) => {
  const { id } = req.params;
  const updates = req.body;
  const { status, result } = await updateService(id, updates);
  return res.status(status).json(result);
};

const deleteSale = async (req, res, _next) => {
  const { id } = req.params;
  const { status, result } = await deleteService(id);
  return res.status(status).json(result);
};

module.exports = {
  createSales,
  deleteSale,
  getAllSales,
  getByIdSale,
  updateSale,
};
