const SalesServices = require('../services/SalesService');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY_STATUS = 422;

const create = async (req, res) => {
  const productsList = req.body;

  const newSales = await SalesServices.create(productsList);

  if (newSales.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).json(newSales);
  }

  return res.status(OK_STATUS).json(newSales);
};

const getAll = async (_req, res) => {
  const salesList = await SalesServices.getAll(); // Interação com o Service
  
  return res.status(OK_STATUS).json({ sales: salesList });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesServices.getById(id); // Interação com o Service

  if (sale.err) {
    return res.status(NOT_FOUND).json(sale);
  }

  return res.status(OK_STATUS).json(sale);
};

module.exports = {
  create,
  getAll,
  getById,
};
