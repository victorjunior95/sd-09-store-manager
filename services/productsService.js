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

const updateProduct = async ({ name, quantity, id }) => {
  const newData = await productsModel.updateProduct({ name, quantity, id });
  return newData;
};

const deleteProduct = async (id) => {
  const deletedData = await productsModel.deleteProduct(id);
  if (deletedData) return deletedData;
};

module.exports = {
  allProducts,
  productById,
  postNewProduct,
  updateProduct,
  deleteProduct,
};