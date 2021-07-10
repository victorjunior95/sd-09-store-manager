const rescue = require('express-rescue');
const ProductsService = require('../services/ProductsService');
const STATUS_CREATED = 201;
const STATUS_OK = 200;

const create = rescue(async(req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductsService.create(name, quantity);

  return res.status(STATUS_CREATED).json(newProduct);
});

const getAll = rescue(async(_req, res) =>{
  const products = await ProductsService.getAll();

  return res.status(STATUS_OK).json({ products });
});

const getById = rescue(async(req, res) => {
  const { id } = req.params;

  const product = await ProductsService.getById(id);

  return res.status(STATUS_OK).json(product);
});

const update = rescue(async(req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await ProductsService.update(id, name, quantity);

  return res.status(STATUS_OK).json(product);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
};
