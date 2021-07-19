const products = require('../models/products');

const getAllProducts = async () => products.getAllProducts();

const getProductById = async (id) => {
  const product = await products.getProductById(id);

  return product;
};

module.exports = { getAllProducts, getProductById };
