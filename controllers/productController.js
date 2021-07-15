const productService = require('../services/productService');

const stateFail = 422;
const stateOk = 200;

const createNewProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.createProduct(name, quantity);
  const stateCreated = 201;

  if(newProduct.err) return res.status(stateFail).json(newProduct);

  return res.status(stateCreated).json(newProduct);
};

const listAllProducts = async (_req, res, _next) => {
  const list = await productService.productsList();

  return res.status(stateOk).json(list);
};

const findProductById = async (req, res, _next) => {
  const { id } = req.params;
  const selectProduct = await productService.findProduct(id);

  if(selectProduct.err) return res.status(stateFail).json(selectProduct);

  return res.status(stateOk).json(selectProduct);
};

const updateProductData = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;


  const updatedProduct = await productService.updateProduct(id, name, quantity);

  if(updatedProduct.err) return res.status(stateFail).json(updatedProduct);


  return res.status(stateOk).json(updatedProduct);
};

module.exports = {
  createNewProduct,
  listAllProducts,
  findProductById,
  updateProductData,
};
