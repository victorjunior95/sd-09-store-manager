const service = require('../services/products');

async function createProduct(req, res) {
  const { name, quantity } = req.body;
  const { status, result } = await service.createProduct(name, quantity);
  return res.status(status).json(result);
};

async function fetchProducts(_req, res) {
  const { status, result } = await service.fetchProducts();
  return res.status(status).json(result);
}

module.exports = {
  createProduct,
  fetchProducts,
};
