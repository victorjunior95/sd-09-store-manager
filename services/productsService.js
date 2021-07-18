const { createProduct, deleteProduct, getAllProducts, getByIdProduct,
  updateProduct } = require('../models/productsModel');

const { alreadyExists, validId, validName, validNumber,
  validQuantity, validSearch } = require('./productsValidations');

const OK_STATUS = 200;
const CREATED_STATUS = 201;

const create = async (name, quantity) => {
  validName(name);
  await alreadyExists(name);
  validQuantity(quantity);
  validNumber(quantity);
  const result = await createProduct(name, quantity);
  return { status: CREATED_STATUS, result };
};

const allProducts = async () => {
  const result = await getAllProducts();
  return { status: OK_STATUS, result };
};

const getById = async (id) => {
  const result = await getByIdProduct(id);
  validSearch(result);
  return { status: OK_STATUS, result };
};

const updateService = async (id, name, quantity) => {
  validName(name);
  validQuantity(quantity);
  validNumber(quantity);
  await updateProduct(id, name, quantity);
  return { status: OK_STATUS, result: { _id: id, name, quantity } };
};

const deleteService = async (id) => {
  await validId(id);
  const result = await deleteProduct(id);
  return { status: OK_STATUS, result };
};

module.exports = {
  allProducts,
  create,
  deleteService,
  getById,
  updateService,
};
