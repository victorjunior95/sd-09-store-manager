const ProductService = require('../services/Product.js');

const STATUS_OK = 201;
const STATUS_INVALID = 400;
const STATUS_NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductService.create(name, quantity);
  if(!product.name) return res.status(UNPROCESSABLE_ENTITY).json(product);

  res.status(STATUS_OK).json(product);
};

module.exports = {
  createProduct,
};