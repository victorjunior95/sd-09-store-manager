const Products = require('../services/Products');
const rescue = require('express-rescue');
const CREATED = 201;


const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await Products.create(name, quantity);
  res.status(CREATED).json(newProduct);
});

module.exports = {
  create,
};
