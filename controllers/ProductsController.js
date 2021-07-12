const rescue = require('express-rescue');
const ProductsServices = require('../services/ProductsServices');
const statusCode = require('../utils/statusCode');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductsServices.create(name, quantity);

  if (newProduct.err) return next(newProduct);

  return res.status(statusCode.created).json(newProduct);
});

module.exports = {
  create,
};
