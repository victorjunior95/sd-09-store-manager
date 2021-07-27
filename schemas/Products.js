const { getProductByName,
  getProductById,
  updateQuantity
} = require('../models/Products');
const { getSaleById } = require('../models/Sales');

const MIN_NAME_LENGTH = 5;
const MIN_QUANTITY = 1;
const INVALID_DATA = 'invalid_data';

const errors = {
  INVALID_NAME: '"name" length must be at least 5 characters long',
  ALREADY_EXISTS_NAME: 'Product already exists',
  INVALID_TYPE_NAME: '"name" must be a string',
  INVALID_QUANTITY: '"quantity" must be larger than or equal to 1',
  INVALID_TYPE_QUANTITY: '"quantity" must be a number',
  INVALID_ID: 'Wrong id format'
};

const errorObject = (code, message) => {
  return { message: { err: { code, message } }, code: 422 };
};

const alreadyExists = async (name) => {
  const exists = await getProductByName(name);
  if(exists) return false;
  return true;
};

const productValidator = async (name, quantity) => {
  const exists = await alreadyExists(name);
  switch(true) {
  case !name || name.length < MIN_NAME_LENGTH:
    return errorObject(INVALID_DATA, errors.INVALID_NAME);
  case typeof name !== 'string':
    return errorObject(INVALID_DATA, errors.INVALID_TYPE_NAME);
  case !quantity || quantity < MIN_QUANTITY:
    return errorObject(INVALID_DATA, errors.INVALID_QUANTITY);
  case typeof quantity !== 'number':
    return errorObject(INVALID_DATA, errors.INVALID_TYPE_QUANTITY);
  case !exists:
    return errorObject(INVALID_DATA, errors.ALREADY_EXISTS_NAME);
  default:
    return {};
  }
};

const idValidator = async (id) => {
  try {
    await getProductById(id);
    return true;
  } catch {
    return errorObject(INVALID_DATA, errors.INVALID_ID);
  }
};

const increaseQuantity = async (sale) => {
  sale.forEach(async ({ productId, quantity }) => {
    const product = await getProductById(productId);
    const newQuantity = product.result.quantity + quantity;
    await updateQuantity(productId, newQuantity);
  });
};

const decreaseQuantity = async (id) => {
  const sale = await getSaleById(id).result;
  sale.forEach(async (item) => {
    const product = await getProductById(item.id);
    const newQuantity = product.result.quantity - quantity;
    await updateQuantity(productId, newQuantity);
  });
};

module.exports = {
  productValidator,
  idValidator,
  increaseQuantity,
  decreaseQuantity
};