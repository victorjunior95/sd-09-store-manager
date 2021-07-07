const ProductsService = require('../services/ProductsService');

const addNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await ProductsService.addProduct(name, quantity);
  //const response = await ProductsService.listProducts();
  res.json(response);
};

module.exports = {
  addNewProduct,
};