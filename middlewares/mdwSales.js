const salesService = require('../services/salesService');
const status = require('../services/statusCode');

const verifyProductsOfSale = async (req, _res, next) => {
  const [...products] = req.body;
  const verifiedProducts = await salesService.verifyProductsList(products);
  if (verifiedProducts.err) { return next(verifiedProducts); }
  return next();
};

const validateAndFindSaleId = async ( req, _res, next) => {
  const { id } = req.params;
  const sale = await salesService.validateAndFindSaleId(id);
  req.params.id = sale;
  if (sale.err) { return next(sale); }
  return next();
};

const validateSaleId = async (req, _res, next) => {
  const { id } = req.params;
  const sale = await salesService.validateSaleId(id);
  req.params.id = sale;
  if (sale.err) { return next(sale); }
  return next();
};

const postOneSale = async (req, res, next) => {
  const [...products] = req.body;
  const addSale = await salesService.postOneSale(products);
  if (addSale.err) { return next(addSale); }
  return res.status(status.OK).json(addSale);
};

const putOneSale = async (req, res, next) => {
  const [...products] = req.body;
  const { id } = req.params;
  const updateSale = await salesService.putOneSale(id, products);
  if (updateSale.err) { return next(updateSale); }
  return res.status(status.OK).json(updateSale);
};

const getAllSales = async (_req, res, next) => {
  const allSales = await salesService.getAllSales();
  if (allSales.err) { return next(allSales); }
  return res.status(status.OK).json(allSales);
};

const getOneSale = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.getOneSale(id);
  if (sale.err) { return next(sale); }
  return res.status(status.OK).json(sale);
};

const deleteOneSale = async (req, res, next) => {
  const { id } = req.params;
  const saleDeleted = await salesService.deleteOneSale(id);
  if (saleDeleted.err) { return next(saleDeleted); }
  return res.status(status.OK).json(saleDeleted);
};

module.exports = {
  verifyProductsOfSale,
  validateAndFindSaleId,
  validateSaleId,
  postOneSale,
  putOneSale,
  getAllSales,
  getOneSale,
  deleteOneSale,
};
