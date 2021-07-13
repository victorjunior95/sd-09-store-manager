const productService = require('../services/productsServices');
const status = require('./status');

const createProduct = async (req, res) => {
  const {name, quantity} = req.body;
  const product = await productService.createProduct(name, quantity);

  if (product.err) {
    return res.status(status.UNPROCESSABLE_ENTITY).json(product);
  }
  return res.status(status.CREATED).json(product);
};

const getAll = async (req, res) => {
  const data = await productService.getAll();
  res.status(status.OK).json({products: data });
};

const findProductController = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findProductService(id);
  res.status(status.OK).json(product);
};

module.exports = {
  createProduct,
  getAll,
  findProductController,
};