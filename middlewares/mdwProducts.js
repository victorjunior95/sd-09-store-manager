const productsService = require('../services/productsService');
const status = require('../services/statusCode');

const getAllProducts = async (_req, res, next) => {
  const allProducts = await productsService.getAllProducts();
  if (allProducts.err) { return next(allProducts); }
  return res.status(status.OK).json(allProducts);
};

const getOneProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.getOneProductById(id);
  if (product.err) { return next(product); }
  return res.status(status.OK).json(product);
};

const postOneProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.postOneProduct(name, quantity);
  if (newProduct.err) { return next(newProduct); }
  return res.status(status.created).json(newProduct);
};

module.exports = { getAllProducts, getOneProduct, postOneProduct };
