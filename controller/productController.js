const productService = require('../service/productService');

const unprocessable = 422;
const created = 201;
const status_ok = 200;

const postProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const validation = await productService.validateProduct(name, quantity);
  if(validation !== null) return res.status(unprocessable).json(validation);

  const newProduct = await productService.createNewProduct(name, quantity);
  return res.status(created).json(newProduct);
};

const getProducts = async (_req, res) => {
  const products = await productService.getAllProducts();

  if (products) return res.status(status_ok).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.validateFoundId(id);
  if(product.err) return res.status(unprocessable).json(product);
  if(product) return res.status(status_ok).json(product);
};

const editProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const validation = await productService.validateProduct(name, quantity);
  if(validation !== null) return res.status(unprocessable).json(validation);

  const product = { id, name, quantity };
  await productService.update(id, name, quantity);
  return res.status(status_ok).json(product);
};

module.exports = { postProduct, getProducts, getProductById, editProduct };

