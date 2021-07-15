const Products = require('../services/Products');

async function create (req, res) {
  const { name, quantity } = req.body;
  const newProduct = await Products.create(name, quantity);
  return res.status(newProduct.status).json(newProduct.result);
};

module.exports = {
  create,
};
