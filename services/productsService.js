const { createProduct, getAllProducts,
  getByIdProduct } = require('../models/productsModel');
const { alreadyExists, validName, validNumber,
  validQuantity, validSearch } = require('./validations');

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

module.exports = {
  create,
  allProducts,
  getById,
};
