const rescue = require('express-rescue');
const ProductService = require('../services/productService');

const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductService.create(name, quantity);

  if (newProduct.err) return res.status(UNPROCESSABLE_ENTITY).json(newProduct);

  return res.status(CREATED).json(newProduct);
});

module.exports = {
  create,
};

/* 
const = (message, err) => {
  message,
  err
}  */