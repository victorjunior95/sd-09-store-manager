const productService = require('../services/productService');
const status = require('./status');

const createProduct = async (req, res) => {
  const {name, quantity} = req.body;
  const product = await productService.createProduct(name, quantity);

  if (product.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(product);
  }
  return res.status(status.CREATED).json(product);
};

const getAllProducts = async (_req, res) => {
  const allProducts = await productService.getAllProducts();
  return res.status(status.OK).json(allProducts);
};

const getProductById = async (req, res) => {
  const {id} = req.params;

  const product = await productService.getProductById(id);
  if (product.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(product);
  }
  return res.status(status.OK).json(product);
};

const updateProduct = async (req, res) => {
  const {id} = req.params;
  const {name, quantity} = req.body;

  const product = await productService.updateProduct(id, name, quantity);
  if (product.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(product);
  }
  return res.status(status.OK).json(product);
};

const deleteProduct = async (req, res) => {
  const {id} = req.params;
  const product = await productService.deleteProduct(id);

  if (product.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(product);
  }
  return res.status(status.OK).json(product);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
