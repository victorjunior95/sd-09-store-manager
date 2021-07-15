const product = require('../services/productServices');
const products = require('../models/productModel');
const HTTP = require('../httpStatusCodeList');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const valid = await product.createProduct(name, quantity);

  if (valid.err) return res.status(HTTP.unprocessableEntity).json(valid);
  return res.status(HTTP.created).json(valid);
};

const listProduct = async (_req, res) => {
  const list = await products.getAll();
  res.status(HTTP.ok).json({ products: list });
};

const listProductById = async (req, res) => {
  const {id} = req.params;

  const list = await product.listProductById(id);
  if (list.err) return res.status(HTTP.unprocessableEntity).json(list);

  res.status(HTTP.ok).json(list[0]);
};

const updateProduct = async (req, res) => {
  const {id} = req.params;
  const { name, quantity } = req.body;
  const newProduct = await product.updateProduct(id, name, quantity);

  if (newProduct.err) return res.status(HTTP.unprocessableEntity).json(newProduct);
  res.status(HTTP.ok).json({id, name, quantity});
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const item = await product.deleteProduct(id);

  if (item.err) return res.status(HTTP.unprocessableEntity).json(item);
  res.status(HTTP.ok).json({ message: 'Product deleted successfully' });
};

module.exports = {
  createProduct,
  listProduct,
  listProductById,
  updateProduct,
  deleteProduct
};