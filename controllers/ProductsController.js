const rescue = require('express-rescue');
const ProductsService = require('../services/ProductsService');
const STATUS_CREATED = 201;

const create = rescue(async(req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductsService.create(name, quantity);

  return res.status(STATUS_CREATED).json(newProduct);
});

module.exports = {
  create,
};
