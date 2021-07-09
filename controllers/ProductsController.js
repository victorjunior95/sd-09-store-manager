const ProductsService = require('../services/ProductsService');
const statusSucessCreate = 201;
const statusSucess = 200;

const getAllProducts = async (_req, res, _next) => {
  const allProducts = await ProductsService.getAllProducts();

  return res.status(statusSucess).json({ products: allProducts });
};

const findById = async (req, res, _next) => {
  const { id } = req.params;
  const product = await ProductsService.findById(id);

  return res.status(statusSucess).json(product);
};

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await ProductsService.createProduct(name, quantity);

  if (product.err) return next(product.err);

  return res.status(statusSucessCreate).json(product);
};

const editProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const newProduct = await ProductsService.editProduct(id, name, quantity );

  return res.status(statusSucess).json(newProduct);
};

const deleteProduct = async (req, res, _next) => {
  const { id } = req.params;

  const deleteProduct = await ProductsService.deleteProduct(id);

  return res.status(statusSucess).json(deleteProduct);
};

module.exports = {
  getAllProducts,
  findById,
  createProduct,
  editProduct,
  deleteProduct
};
