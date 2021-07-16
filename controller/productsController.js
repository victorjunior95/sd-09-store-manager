const productServices = require('../services/productsServices');

const HTML_OK = 200;
const HTML_UNPROCESSABLE_ENTITY = 422;
const LENGTH_ZERO = 0;

const registerNewProduct = async (req, res) => {
  const {name, quantity} = req.body;
  const newProduct = {name, quantity};
  const result = await productServices.registerNewProduct(newProduct);
  return res.status(result.status).json(result.message);
};

const getProducts = async (req, res) => {
  const products = await productServices.getProducts();
  console.log(products);
  return res.status(HTML_OK).json({'products': products});
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productServices.getProductById(id);
  return res.status(product.status).json(product.message);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const {name, quantity} = req.body;
  const newDataProduct = {name, quantity};
  const result = await productServices.updateProductById(id, newDataProduct);
  return res.status(result.status).json(result.message);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const result = await productServices.deleteProductById(id);
  return res.status(result.status).json(result.message);
};

module.exports = {
  registerNewProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById
};