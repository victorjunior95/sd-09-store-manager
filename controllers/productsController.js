//aqui ficam os middlewares (funções que recebem parametros req, res, next, err)
const productsService = require('../services/productsService');

const createProduct = async (req, res) => {
  const product = req.body;
  const { status, createdProduct } = await productsService.createProduct(product);
  res.status(status).json(createdProduct);
};

const getAllProducts = async (_req, res) => {
  const { status, products } = await productsService.getAllProducts();
  res.status(status).json({ products: products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, product } = await productsService.getProductById(id);
  res.status(status).json(product);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const { status, editedProduct } = await productsService.editProduct(id, product);
  res.status(status).json(editedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, deletedProduct } = await productsService.deleteProduct(id);
  res.status(status).json(deletedProduct);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
};
