const ProductsService = require('../services/ProductsService');

const addNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await ProductsService.addProduct(name, quantity);
  res.status(response.status).json(response.result);
};

const listProduct = async (req, res) => {
  const { id } = req.params;
  const response = await ProductsService.listProducts(id);
  res.status(response.status).json(response.result);
}; 

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const response = await ProductsService.editProduct(id, name, quantity);
  res.status(response.status).json(response.result);
};

module.exports = {
  addNewProduct,
  listProduct,
  updateProduct,
};