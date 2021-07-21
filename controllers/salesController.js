const { createSales, salesList, saleListById } = require('../services/salesService');

const STATUS_SUCCESS = 200;
const STATUS_ERROR = 422;
// const STATUS_CREATED = 201;
const STATUS_NOT_FOUND = 404;

const salesCreation = async (req, res, _next) => {
  const salesData = req.body;
  const salesCreated = await createSales(salesData);
  if (salesCreated.code) return res.status(STATUS_ERROR).json({
    err: {
      code: salesCreated.code,
      message: salesCreated.message,
    }
  });
  return res.status(STATUS_SUCCESS).json(salesCreated);
};

const listAllSales = async (_req, res, _next) => {
  const allSales = await salesList();
  return res.status(STATUS_SUCCESS).json({ sales: allSales });
};

const listSaleById = async (req, res, _next) => {
  const { id } = req.params;
  const saleById = await saleListById(id);
  if (saleById.err) return res.status(STATUS_NOT_FOUND).json(saleById);
  return res.status(STATUS_SUCCESS).json(saleById);
};

module.exports = {
  salesCreation,
  listAllSales,
  listSaleById,
};