const productsService = require('../services/productsService');
const productModel = require('../models/productsModel');
const rescue = require('express-rescue');

const status = {
  unprocessableEntity: 422,
  ok: 200,
  created: 201,
};

const getAllProducts = async (_req, res) => {
  const products = await productModel.getAllProducts();
  return res.status(status.ok).json({ products });
};

const getProductById = [rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
  return res.status(status.ok).json(product);
}), (err, _req, res, _next) => {
  return res.status(status.unprocessableEntity).json(err);
}];

const insertProduct = [rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.insertProduct(name, quantity);
  return res.status(status.created).json(product);
}), (err, _req, res, _next) => {
  return res.status(status.unprocessableEntity).json(err);
}];

const updateProduct = [rescue(async (req, res) => {
  const {name, quantity } = req.body;
  const { id } = req.params;
  const product = await productsService.updateProduct(id, name, quantity);
  return res.status(status.ok).json(product);
}), (err, _req, res, _next) => {
  return res.status(status.unprocessableEntity).json(err);
}];

const deleteProduct = [rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productsService.deleteProduct(id);
  return res.status(status.ok).json(product);
}), (err, _req, res, _next) => {
  return res.status(status.unprocessableEntity).json(err);
}];

module.exports = {
  insertProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
