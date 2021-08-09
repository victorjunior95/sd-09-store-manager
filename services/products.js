const products = require('../models/products');

const noData = 'invalid data';

const isValidName = async (name) => {
  const minLength = 5;
  if (name.length < minLength) throw {status: 422, result: {error: {
    code: noData,
    message: '"name" length must be at least 5 caracters long',
  }}};
};

const nameExists = async (name) => {
  if (await products.getProductByName(name)) throw {status: 422, result: {error: {
    code: noData,
    message: 'Product already exists',
  }}};
};

const isValidQuantity = async (quantity) => {
  const min = 1;
  if (parseInt(quantity, 10) < min) throw {status: 422, result: {error: {
    code: noData,
    message: '"quantity" must be larger than or equal to 1',
  }}};
  if (typeof(quantity) !== 'number') throw {status: 422, result: {errpr: {
    code: noData,
    message: '"quantity" must be a number',
  }}};
};

const isValidIdExists = async (id) => {
  if (await !products.getProductById(id)) throw {status: 422, result: {error: {
    code: noData,
    message: 'Wrong id format',
  }}};
};


const postProduct = async (name, quantity) => {
  isValidName(name);
  await nameExists(name);
  isValidQuantity(quantity);
  const response = await products.postProduct(name, quantity);
  return { status: 201, response };
};

const getAllProducts = async () => {
  const response = await products.getAllProducts();
  return { status: 200, response };
};

const getProductById = async (id) => {
  await isValidIdExists(id);
  const response = await products.getProductById(id);
  return { status: 200, response };
};

const putProduct = async (id, name, quantity) => {
  isValidName(name);
  isValidQuantity(quantity);
  const response = await products.putProduct(id, name, quantity);
  return { status: 200, response };
};

const deleteProduct = async (id) => {
  await isValidIdExists(id);
  const response = await products.deleteProduct(id);
  return { status: 200, response };
};

module.exports = {
  postProduct,
  getAllProducts,
  getProductById,
  putProduct,
  deleteProduct,
};
