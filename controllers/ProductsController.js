const rescue = require('express-rescue');
const ProductsServices = require('../services/ProductsServices');
const statusCode = require('../utils/statusCode');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductsServices.create(name, quantity);

  if (newProduct.err) return next(newProduct);

  return res.status(statusCode.created).json(newProduct);
});

const getAll = rescue(async (_req, res) => {
  const allProducts = await ProductsServices.getAll();
  return res.status(statusCode.ok).json(allProducts);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ProductsServices.getById(id);
  return res.status(statusCode.ok).json(product);
});

module.exports = {
  create,
  getAll,
  getById,
};
