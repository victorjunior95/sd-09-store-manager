const {
  newProduct,
  productsList,
  productById,
  patchProduct,
  removeProduct
} = require('../services/productsService');

const STATUS_422 = 422;
const STATUS_201 = 201;
const STATUS_200 = 200;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await newProduct(name, quantity);
  if (product.err) return res.status(STATUS_422).json(product);
  return res.status(STATUS_201).json(product);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productById(id);
  if (product.err) return res.status(STATUS_422).json(product);
  return res.status(STATUS_200).json(product);
};

const getProducts = async (_req, res) => {
  const products = await productsList();
  return res.status(STATUS_200).json({ products });
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await patchProduct(id, name, quantity);
  if (product.err) return res.status(STATUS_422).json(product);
  return res.status(STATUS_200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await removeProduct(id);
  if (product.err) return res.status(STATUS_422).json(product);
  return res.status(STATUS_200).json(product);
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  putProduct,
  deleteProduct
};