const productModel = require('../models/productsModel');
const { messageErrorsProducts: messageErr } = require('../helpers/messagesErros');
const { ObjectId } = require('mongodb');

const generateMessage = (msg) => {
  return ({ code: msg.code, message: msg.message, status: msg.status });
};

const validateName = async (name) => {
  const minLength = 5;
  const productInDB = await productModel.getByName(name);

  if (name.length < minLength) return (generateMessage(messageErr.nameInvalid));

  if (productInDB.length) return (generateMessage(messageErr.nameRepeated));
};

const validateQuantity = (quantity) => {
  const valueInvalid = 0;

  if (quantity === valueInvalid) return (generateMessage(messageErr.quantityEqualZero));

  if (quantity < valueInvalid) return (generateMessage(messageErr.quantityInvalid));

  if (typeof quantity !== 'number') return (generateMessage(messageErr.quantityNAN));
};

// create
const add = async (name, quantity, next) => {
  const errorName = await validateName(name);
  const errorQuantity = validateQuantity(quantity);

  if (errorName) return next(errorName);
  if (errorQuantity) return next(errorQuantity);

  return (await productModel.add(name, quantity));
};

// select
const getAll = async () => ({ products: await productModel.getAll() });

// getByName
const getById = async (id, next) => {
  if (!ObjectId.isValid(id)) return next(generateMessage(messageErr.idFormatInvalid));
  const product = await productModel.getById(ObjectId(id));

  return product;
};

// getByName
const getByName = async (name) => {
  const product = await productModel.getByName(name);
  if (!product) return { message: 'not_found' };

  return product;
};

module.exports = {
  add,
  getAll,
  getByName,
  getById,
};
