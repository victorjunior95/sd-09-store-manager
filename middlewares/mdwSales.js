const salerService = require('../services/salesService');
const status = require('../services/statusCode');

const putOneSale = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await salerService.putOneSale(id, name, quantity);
  if (updatedProduct.err) { return next(updatedProduct); }
  return res.status(status.OK).json(updatedProduct);
};

module.exports = {
  putOneSale,
};
