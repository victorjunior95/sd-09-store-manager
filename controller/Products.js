const Products = require('../service/Products');
const rescue = require('express-rescue');

const createNewProduct = rescue( async (req, res) => {
  const { name, quantity } = req.body;
  const { status, newProduct } = await Products.createNewProduct(name, quantity);

  res.status(status).json(newProduct);
});

const getAll = rescue(async (req, res) => {
  const { result, status } = await Products.getAll();
  res.status(status).json(result);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const { status, product } = await Products.findById(id);
  res.status(status).json(product);
});

module.exports = {
  createNewProduct,
  getAll,
  findById,
};