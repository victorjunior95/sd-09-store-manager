const productModel = require('../models/productsModel');
const validations = require('../schemas/ProductSchema');

const getProductById = async (id) => {
  validations.validateId(id);

  return await productModel.getProductById(id);
};

const insertProduct = async (name, quantity) => {
  const products = await productModel.getAllProducts();

  validations.validateName(name, products);
  validations.validateQuantity(quantity);

  return productModel.insertProduct(name, quantity);
};

const updateProduct = async (id, name, quantity) => {
  validations.validateName(name, []);
  validations.validateQuantity(quantity);

  return productModel.updateProduct(id, name, quantity);
};

const deleteProduct = async (id) => {
  validations.validateId(id);

  return productModel.deleteProduct(id);
};

module.exports = {
  insertProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
