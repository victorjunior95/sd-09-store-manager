const ProductsService = require('../services/ProductsService');

const statusSucessCreate = 201;
const statusSucess = 200;

const deleteProduct = async (req, res, _next) => {
  const { id } = req.params;
  const deletecProduct = await ProductsService.deleteProduct(id);

  return res.status(statusSucess).json(deletecProduct);
};

const updateProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const newProduct = await ProductsService.updateProduct(id, name, quantity);

  return res.status(statusSucess).json(newProduct);
};

const getAllProducts = async (_req, res, _next) => {
  const allProducts = await ProductsService.getAllProducts();

  return res.status(statusSucess).json({ products: allProducts });
};

const getProductById = async (req, res, _next) => {
  const { id } = req.params;
  const product = await ProductsService.getProductById(id);

  return res.status(statusSucess).json(product);
};

const addProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const product = await ProductsService.addProduct(name, quantity);

  if (product.err) return next(product.err);

  return res.status(statusSucessCreate).json(product);
};



module.exports = {
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  addProduct
};

