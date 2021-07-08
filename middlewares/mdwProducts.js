const productsService = require('../services/productsService');
const status = require('../services/statusCode');

const verifyProductBody = async (req, _res, next) => {
  const { name, quantity } = req.body;
  const verified = await productsService.verifyBody(name, quantity);
  if (verified.err) { return next(verified); }
  return next();
};

const verifyProductId = (req, _res, next) => {
  const { id } = req.params;
  const verified = productsService.verifyMongoId(id);
  req.params.id = verified;
  if (verified.err) { return next(verified); }
  return next();
};

const getAllProducts = async (_req, res, next) => {
  const allProducts = await productsService.getAllProducts();
  if (allProducts.err) { return next(allProducts); }
  return res.status(status.OK).json(allProducts);
};

const getOneProduct = async (req, res, next) => {
  const { id } = req.params;
  const obj = {_id: id};
  const product = await productsService.getOneProduct(obj);
  if (product.err) { return next(product); }
  return res.status(status.OK).json(product);
};

const postOneProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.postOneProduct(name, quantity);
  if (newProduct.err) { return next(newProduct); }
  return res.status(status.created).json(newProduct);
};

const putOneProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await productsService.putOneProduct(id, name, quantity);
  if (updatedProduct.err) { return next(updatedProduct); }
  return res.status(status.OK).json(updatedProduct);
};

module.exports = {
  verifyProductBody,
  verifyProductId,
  getAllProducts,
  getOneProduct,
  postOneProduct,
  putOneProduct
};
