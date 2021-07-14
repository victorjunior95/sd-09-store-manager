const productsModel = require('../models/productsModel');

const allProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const productById = async (id) => {
  const product = await productsModel.getProductById(id);
  
  if (!product) return null;

  return product;
};

const postNewProduct = async ({ name, quantity }) => {
  const newProduct = await productsModel.postProduct({ name, quantity });
  return newProduct;
};

module.exports = {
  allProducts,
  productById,
  postNewProduct,
};