const Products = require('../services/Products');
const rescue = require('express-rescue');

const createNewProduct = rescue( async (req, res) => {
  const { name, quantity } = req.body;
  const { status, newProduct } = await Products.createNewProduct(name, quantity);

  res.status(status).json(newProduct);
});

const getAll = rescue(async (req, res) => {
  const { result, status } = await Products.getAll();
  res.status(status).json(result);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const { status, product } = await Products.findById(id);
  res.status(status).json(product);
});

const updateProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, updatedProduct } = await Products.updateProduct(id, name, quantity);
  res.status(status).json(updatedProduct);
});

const deleteProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const { status, deletedProduct } = await Products.deleteProduct(id);
  res.status(status).json(deletedProduct);
});

module.exports = {
  createNewProduct,
  getAll,
  findById,
  updateProduct,
  deleteProduct,
};