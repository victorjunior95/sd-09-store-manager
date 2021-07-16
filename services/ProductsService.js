const ProductsModel = require('../models/ProductsModel');

const deleteProduct = async (id) => {
  const product = await ProductsModel.deleteProduct(id);
  if (product) return product;
};

const updateProduct = async ({id, name, quantity}) => {
  const product = await ProductsModel.updateProduct({id, name, quantity});

  return product;
};

const getAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await ProductsModel.getProductById(id);
  if (!product) return null;
  return product;
};

const addProduct = async (name, quantity) => {
  const product = await ProductsModel.addProduct({name, quantity});

  return product;
};



module.exports = {
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  addProduct,
};
