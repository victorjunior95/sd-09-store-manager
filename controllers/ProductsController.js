const ProductsService = require('../services/ProductsService');

const addNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await ProductsService.addProduct(name, quantity);
  //  const response = await ProductsService.listProducts();
  res.status(response.status).json(response.result);
};

module.exports = {
  addNewProduct,
};