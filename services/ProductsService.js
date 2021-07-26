const ProductsModel = require('../models/ProductsModel');
const { HTTP_NOT_FOUND_STATUS } = require('../httpResponse');

const deleteProduct = async (id) => {
  const product = await ProductsModel.deleteProduct(id);
  if (product) return product;
};

const updateProduct = async ({id, name, quantity}) => {
  const product = await ProductsModel.updateProduct({name, quantity, id });
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

const decreaseQuantity = async (id, quantity) => {
  const zero = 0;
  const product = await ProductsModel.getProductById(id);
  const newQuantity = product.quantity - quantity;
  if (newQuantity < zero) {
    return {
      status: 404,
      result: {
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell'
        }
      }

    };
  }
  await ProductsModel.updateQuantity(id, newQuantity);
};

const increaseQuantity = async (id, quantity) => {
  const product = await ProductsModel.getProductById(id);
  const newQuantity = product.quantity + quantity;
  await ProductsModel.updateQuantity(id, newQuantity);
};

module.exports = {
  decreaseQuantity,
  increaseQuantity,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  addProduct,
};
