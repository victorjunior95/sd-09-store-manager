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

const findAll = rescue(async (_req, res) => {
  const product = await ProductService.findAll();
  return res.status(OK).json(product);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.findById(id);

  if (product.err) return res.status(UNPROCESSABLE_ENTITY).json(product);
  return res.status(OK).json(product);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await ProductService.update(id, name, quantity);

  if (product.err) return res.status(UNPROCESSABLE_ENTITY).json(product);
  return res.status(OK).json({ id, name, quantity });
});

module.exports = {
  create,
  findAll,
  findById,
  update,
};

/* 
const = (message, err) => {
  message,
  err
}  */