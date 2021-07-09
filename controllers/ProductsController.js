const Products = require('../services/ProductsService');

const STATUS_201 = 201;
const STATUS_200 = 200;

const addNewProduct = async (req, res, next) => {
  const product = await Products.newProduct(req.body);

  if (product.err) return next(product);

  res.status(STATUS_201).json(product);
};

const getAll = async (_req, res, _next) => {
  const products = await Products.getAll();

  res.status(STATUS_200).json({ products });  
};

const getOne = async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.getOne(id);

  if (product.err) return next(product);

  res.status(STATUS_200).json(product);  
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const newProduct = await Products.updateProduct({ id, name, quantity });

  console.log(newProduct);

  if (newProduct.err) return next(newProduct);

  // console.log(newProduct);

  res.status(STATUS_200).json(newProduct.value);
};

module.exports = {
  addNewProduct,
  getAll,
  getOne,
  updateProduct,
};