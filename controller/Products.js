const Products = require('../service/Products');
const rescue = require('express-rescue');

const createNewProduct = rescue( async (req, res) => {
  const { name, quantity } = req.body;
  const { status, newProduct } = await Products.createNewProduct(name, quantity);

  res.status(status).json(newProduct);
});

module.exports = {
  createNewProduct,
};