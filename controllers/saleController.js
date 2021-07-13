const saleService = require('../services/saleService');
const OK = 200;
const UNPROCESSABLE = 422;
const notFound = 404;

const salesCreate = async (req, res) => {
  const itemSold = req.body;

  const newSold = await saleService.createSales(itemSold);
  if (newSold.err) {
    return res.status(UNPROCESSABLE).json(newSold);
  }
  return res.status(OK).json(newSold);
};

const listAllSales = async (_req,res) => {
  const allSales = await saleService.listAllSales();

  return res.status(OK).json(allSales);
};

const saleIdController = async (req, res) => {
  const { id } = req.params;

  const saleId = await saleService.salesId(id);
  if (saleId.err) {
    return res.status(notFound).json(saleId);
  }

  return res.status(OK).json(saleId);
};

const salesUpdateController = async (req, res) => {
  const { productId, quantity } = req.body[0];
  const { id } = req.params;
  const saleUpdate = await saleService.salesUpdate(id, productId, quantity);
  console.log(saleUpdate);
  if (saleUpdate.err) {
    return res.status(UNPROCESSABLE).json(saleUpdate);
  }

  return res.status(OK).json(saleUpdate);
};

const excludeSaleController = async (req, res) => {
  const { id } = req.params;

  const excludeSale = await saleService.deleteSales(id);
  if (excludeSale.err) {
    return res.status(UNPROCESSABLE).json(excludeSale);
  }

  return res.status(OK).json(excludeSale);
};

module.exports = {
  salesCreate,
  listAllSales,
  saleIdController,
  salesUpdateController,
  excludeSaleController
};