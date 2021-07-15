const Products = require('../services/Products');
const rescue = require('express-rescue');
const CREATED = 201;


const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await Products.create(name, quantity);
  res.status(CREATED).json(newProduct);
});

const getAll = rescue(async (req, res) => {
  const { result, status } = await Products.getAll();
  res.status(status).json(result);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const { status, product } = await Products.findById(id);
  res.status(status).json(product);
});

module.exports = {
  create,
  getAll,
  findById,
};
