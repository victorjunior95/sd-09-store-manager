const { getProductById } = require('../model/productModel');
const { 
  validateNewProduct,
  getAllProducts,
  findProductById } = require('../service/productService');


const unprocessable = 422;
const created = 201;
const status_ok = 200;

const postProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await validateNewProduct(name, quantity);

  if(newProduct.err) return res.status(unprocessable).json(newProduct);
  res.status(created).json(newProduct);
};

const getProducts = async (_req, res, next) => {
  const products = await getAllProducts();

  if (products) return res.status(status_ok).json(products);
};

const getProductId = async (req, res, next) => {
  const { _id } = req.body;
  const product = await findProductById(_id);
  console.log(product);
  if(product) return res.status(status_ok).json(product);
  if(product.err) return res.status(unprocessable).json(product);
};

module.exports = { postProduct, getProducts, getProductId };

