const productServices = require('../services/productsServices');

async function addProduct(req, res) {
  const { name, quantity } = req.body;
  const { status, result } = await productServices.addProduct(name, quantity);
  return res.status(status).json(result);
}

module.exports = {
  addProduct,
};
