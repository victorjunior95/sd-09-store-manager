const { 
  validateNewProduct,
  getAllProducts,
  findProductById } = require('../service/productService');

const unprocessable = 422;
const created = 201;
const status_ok = 200;

const postProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await validateNewProduct(name, quantity);

  if(newProduct.err) return res.status(unprocessable).json(newProduct);
  return res.status(created).json(newProduct);
};

const getProducts = async (_req, res) => {
  const products = await getAllProducts();

  if (products) return res.status(status_ok).json({ products });
};

const getProductId = async (req, res) => {
  const { id } = req.params;
  const product = await findProductById(id);
  if(product.err) return res.status(unprocessable).json(product);
  if(product) return res.status(status_ok).json(product);
};

module.exports = { postProduct, getProducts, getProductId };

