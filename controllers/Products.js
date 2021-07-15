const Products = require('../services/Products');

const CREATED = 201;

async function create (req, res) {
  const { name, quantity } = req.body;
  const newProduct = await Products.create(name, quantity);
  res.status(CREATED).json(newProduct);
};

module.exports = {
  create,
};
