const rescue = require('express-rescue');
const ProductService = require('../services/productService');

const OK = 200;
const CREATED = 201;
const UNPROCESSABLE_ENTITY = 422;

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductService.create(name, quantity);

  if (newProduct.err) return res.status(UNPROCESSABLE_ENTITY).json(newProduct);

  return res.status(CREATED).json(newProduct);
});

const findAll = rescue(async (req, res) => {
  const product = await ProductService.findAll();
  console.log(res.body);
  return res.status(OK).json(product);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.findById(id);

  if (product.err) return res.status(UNPROCESSABLE_ENTITY).json(product);
  return res.status(OK).json(product);
});

module.exports = {
  create,
  findAll,
  findById,
};

/* 
const = (message, err) => {
  message,
  err
}  */