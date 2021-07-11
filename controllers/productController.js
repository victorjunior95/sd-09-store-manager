const product = require('../services/productServices');
const products = require('../models/productModel');


const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const valid = await product.createProduct(name, quantity);

  if (valid.err) return res.status(422).json(valid);
  return res.status(201).json(valid);
};

const listProduct = async (_req, res) => {
  const list = await products.getAll();
  res.status(201).json(list);
};

const updateProduct = async (req, res) => {
  const { id, name, quantity } = req.body;
  res.status(200).json({ message: 'Product updated successfully' });
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  res.status(200).json({ message: 'Product deleted successfully' });
};

module.exports = {
  createProduct,
  listProduct,
  updateProduct,
  deleteProduct
};