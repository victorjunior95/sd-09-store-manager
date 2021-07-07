const productsService = require('../services/productsService');
const status = require('../services/statusCode');

const postOneProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.postOneProduct(name, quantity);
  if (newProduct.message) { return next(newProduct); }
  res.status(status.created).json(newProduct);
};

module.exports = { postOneProduct };
