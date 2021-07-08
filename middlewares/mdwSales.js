const salesService = require('../services/salesService');
const status = require('../services/statusCode');

const verifyProductsOfSale = async (req, _res, next) => {
  const [...products] = req.body;
  const verifiedProducts = await salesService.verifyProductsList(products);
  if (verifiedProducts.err) { return next(verifiedProducts); }
  return next();
};

const putOneSale = async (req, res, next) => {
  const [...products] = req.body;
  const updatedProduct = await salesService.putOneSale(products);
  if (updatedProduct.err) { return next(updatedProduct); }
  return res.status(status.OK).json(updatedProduct);
};

const getAllSales = async (_req, res, next) => {
  const allSales = await salesService.getAllSales();
  if (allSales.err) { return next(allSales) ;}
  return res.status(status.OK).json(allSales);
};

const getOneSale = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.getOneSale(id);
  if (sale.err) { return next(sale) ;}
  return res.status(status.OK).json(sale);
};

module.exports = {
  verifyProductsOfSale,
  putOneSale,
  getAllSales,
  getOneSale
};
