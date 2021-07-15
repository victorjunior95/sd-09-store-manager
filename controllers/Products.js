const Products = require('../services/Products');

const OK = 200;

async function create (req, res) {
  const { name, quantity } = req.body;
  const newProduct = await Products.create(name, quantity);
  res.status(OK).json(newProduct);
};

module.exports = {
  create,
};
