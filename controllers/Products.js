const productsService = require('../services/Products');
const rescue = require('express-rescue');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productsService.createProduct(name, quantity);
  return res.status(response.code).json(response.result);
});

const getAllProducts = rescue(async (_req, res) => {
  const response = await productsService.getAllProducts();
  return res.status(response.code).json(response.result);
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getProductById(id);
  return res.status(response.code).json(response.result);
});

const editProduct = rescue(async (req,res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const response = await productsService.editProduct(id, name, quantity);
  return res.status(response.code).json(response.result);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const response = await productsService.deleteProduct(id);
  return res.status(response.code).json(response.result);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct
};