const productServices = require('../services/productsServices');

async function addProduct(req, res) {
  const { name, quantity } = req.body;
  const { status, result } = await productServices.addProduct(name, quantity);
  return res.status(status).json(result);
}

async function getProducts(_req, res) {
  const { status, result } = await productServices.getProducts();
  return res.status(status).json(result);
}

async function getProductById(req, res) {
  const { id } = req.params;
  const { status, result }  = await productServices.getProductById(id);
  return res.status(status).json(result);
}

module.exports = {
  addProduct,
  getProducts,
  getProductById,
};
