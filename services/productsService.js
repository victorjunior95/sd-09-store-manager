const productsModel = require('../models/productsModel');

const productsValidations = require('./productsValidations');

const OK_STATUS = 200;
const CREATED_STATUS = 201;

const create = async (name, quantity) => {
  productsValidations.validName(name);
  await productsValidations.alreadyExists(name);
  productsValidations.validQuantity(quantity);
  productsValidations.validNumber(quantity);
  const result = await productsModel.createProduct(name, quantity);
  return { status: CREATED_STATUS, result };
};

const allProducts = async () => {
  const result = await productsModel.getAllProducts();
  return { status: OK_STATUS, result };
};

const getById = async (id) => {
  const result = await productsModel.getByIdProduct(id);
  productsValidations.validSearch(result);
  return { status: OK_STATUS, result };
};

const updateService = async (id, name, quantity) => {
  productsValidations.validName(name);
  productsValidations.validQuantity(quantity);
  productsValidations.validNumber(quantity);
  await productsModel.updateProduct(id, name, quantity);
  return { status: OK_STATUS, result: { _id: id, name, quantity } };
};

const deleteService = async (id) => {
  await productsValidations.validId(id);
  const result = await productsModel.deleteProduct(id);
  return { status: OK_STATUS, result };
};

module.exports = { allProducts, create, deleteService, getById, updateService };
