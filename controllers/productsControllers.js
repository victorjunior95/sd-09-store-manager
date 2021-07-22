const productsModels = require('../models/productsModels');

const CREATE_OK = 201;
const STATUS_OK = 200;

async function addProduct(req, res, _next) {
  const { name, quantity } = req.body;
  const newProduct = await productsModels.create(name, quantity);
  return res.status(CREATE_OK).json(newProduct);
};

async function getProducts(req, res) {
  const products = await productsModels.getAll();

  return res.status(STATUS_OK).json(products);
}
module.exports = {
  addProduct,
  getProducts,
};
