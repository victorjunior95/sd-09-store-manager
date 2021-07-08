const {
  newProduct
} = require('../services/productsService');

const STATUS_422 = 422;
const SUCCESS = 201;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await newProduct(name, quantity);
  console.log(`controler ${product.code}`);
  if (product.err) return res.status(STATUS_422).json(product);
  return res.status(SUCCESS).json(product);
};

module.exports = {
  createProduct,
};