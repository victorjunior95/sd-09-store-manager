const productsService = require('../service/productsService');

const registerProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, response } = await productsService.register(name, quantity);

  res.status(status).json(response);
};

const listProducts = async (req, res) => {
  const { id } = req.params;
  const { status, response } = await productsService.list(id);

  res.status(status).json(response);
};

module.exports = {
  registerProduct,
  listProducts
};
