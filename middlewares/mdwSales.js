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

module.exports = {
  verifyProductsOfSale,
  putOneSale,
};
