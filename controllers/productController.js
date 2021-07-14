const productService = require('../services/productsServices');
const status = require('../assistent/status');

const createProduct = async (req, res) => {
  const {name, quantity} = req.body;
  const product = await productService.createProduct(name, quantity);

  if (product.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(product);
  }
  return res.status(status.CREATED).json(product);
};

const getAll = async (req, res) => {
  const data = await productService.getAllService();
  res.status(status.OK).json({products: data });
};

const findProductController = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findProductService(id);
  if (product.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(product);
  }
  res.status(status.OK).json(product);
};

const editProductController = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const products = await productService.editProductService(id, name, quantity);
  if (products.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(products);
  }
  res.status(status.OK).json(products);
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const products = await productService.deleteProductService(id);
  if (products.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(products);
  }
  res.status(status.OK).json(products);
};

module.exports = {
  createProduct,
  getAll,
  findProductController,
  editProductController,
  deleteProductController,
};