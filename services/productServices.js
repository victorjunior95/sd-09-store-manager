const validateName = require('../schemas/validateName');
const validateQuant = require('../schemas/validateQuant');
const productModel = require('../models/productModel');

const addProduct = async (body) => {
  const { name, quantity } = body;

  const findProduct = await productModel.findByName(name);
  if (findProduct) return {err: {
    code: 'invalid_data',
    message: 'Product already exists',
  }};

  const checkName = validateName(name);
  if (checkName.err) return checkName;

  const checkQuant = validateQuant(quantity);
  if (checkQuant.err) return checkQuant;

  const response = await productModel.addProduct(body);

  return response;
};

const getAllProducts = async () => {
  const response = await productModel.getAllProducts();

  return response;
};

const getProductById = async(id) => {
  const response = await productModel.getProductById(id);
  
  if (!response) return { err: {
    code: 'invalid_data',
    message: 'Wrong id format'
  }};

  return response;
};

const updateProduct = async (id, body) => {
  const { name, quantity } = body;

  const checkName = validateName(name);
  if (checkName.err) return checkName;

  const checkQuant = validateQuant(quantity);
  if (checkQuant.err) return checkQuant;

  const response = await productModel.updateProduct(id, name, quantity);

  return response;
};

const deleteProduct = async (id) => {
  const findedProduct = await productModel.getProductById(id);
  if (!findedProduct) return { err: {
    code: 'invalid_data',
    message: 'Wrong id format'
  }};

  const { name, quantity } = findedProduct;

  const response = await productModel.deleteProduct(id, name, quantity);

  return response;
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
