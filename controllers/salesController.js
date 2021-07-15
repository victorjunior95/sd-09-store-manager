const {
  allSalesService,
  findSale,
  registerSales,
  deleteSale,
} = require('../services/indexSales');

const insertSales = async (req, res) => {
  const { body } = req;

  const { code, message } = await registerSales(body);
  
  return res.status(code).json(message);
};

const allSales = async (_req, res) => {
  const { code, message } = await allSalesService();

  res.status(code).json(message);
};

const findSalesById = async (req, res) => {
  const { id } = req.params;

  const { code, message } = await findSale(id);

  res.status(code).json(message);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;

  const { code, message } = await deleteSale(id);

  return res.status(code).json(message);
};

module.exports = {
  insertSales,
  allSales,
  findSalesById,
  deleteSaleById,
};