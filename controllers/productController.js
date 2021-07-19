const productService = require('../services/productService');

const STATUS_201 = 201;
const STATUS_200 = 200;

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.create(name, quantity);
  return res.status(STATUS_201).send(newProduct);
};

const getAll = async (_req, res) => {
  const allProducts = await productService.getAll();
  return res.status(STATUS_200).json(allProducts);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  return res.status(STATUS_200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const put = await productService.updateProduct(id, name, quantity);
  return res.status(STATUS_200).json(put);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.deleteProduct(id);
  return res.status(STATUS_200).json(deletedProduct);
};

module.exports = {
  create,
  deleteProduct,
  getAll,
  getProductById,
  updateProduct,
};
