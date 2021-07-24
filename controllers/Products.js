const productsService = require('../services/Products');
const rescue = require('express-rescue');

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productsService.create(name, quantity);
  return res.status(response.code).json(response.result);
});

const getAll = rescue(async (_req, res) => {
  const response = await productsService.getAll();
  return res.status(response.code).json(response.result);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getById(id);
  return res.status(response.code).json(response.result);
});

const edit = rescue(async (req,res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const response = await productsService.edit(id, name, quantity);
  return res.status(response.code).json(response.result);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const response = await productsService.deleteProduct(id);
  return res.status(response.code).json(response.result);
});

module.exports = {
  create,
  getAll,
  getById,
  edit,
  deleteProduct
};