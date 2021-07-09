const product = require('../services/productServices');

const createProduct = async (request, response) => {
  const { name, quantity } = request.body;

  return response.status(200).json({ message: 'Product created successfully' });
};

const listProduct = async (request, response) => {
  const list = await product.listProduct();
  response.status(200).json(list);
};

const updateProduct = async (request, response) => {
  const { id, name, quantity } = request.body;
  response.status(200).json({ message: 'Product updated successfully' });
};

const deleteProduct = async (request, response) => {
  const { id } = request.body;
  response.status(200).json({ message: 'Product deleted successfully' });
};

module.exports = {
  createProduct,
  listProduct,
  updateProduct,
  deleteProduct
};