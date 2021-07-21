const {
  createSales,
  salesList,
  saleListById,
  saleUpdate,
  saleDelete,
} = require('../services/salesService');

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
  if (!saleById) return res.status(STATUS_NOT_FOUND).json(saleById);
  if (saleById.err) return res.status(STATUS_NOT_FOUND).json(saleById);
  return res.status(STATUS_SUCCESS).json(saleById);
};

const updateSale = async (req, res, _next) => {
  const { id } = req.params;
  const itensSold = req.body;

  const saleData = { id, itensSold };
  const updated = await saleUpdate(saleData);
  console.log(updated);
  if (updated.err) return res.status(STATUS_ERROR).json(updated);
  return res.status(STATUS_SUCCESS).json(updated);
};

const deleteSale = async (req, res, _next) => {
  const { id } = req.params;
  const deletedInfo = await saleListById(id);
  const deleted = await saleDelete(id);
  if (deleted.err) return res.status(STATUS_ERROR).json(deleted);
  return res.status(STATUS_SUCCESS).json(deletedInfo);
};

module.exports = {
  salesCreation,
  listAllSales,
  listSaleById,
  updateSale,
  deleteSale,
};