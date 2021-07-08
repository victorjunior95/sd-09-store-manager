const productModel = require('../models/productsModel');
const { messageErrorsProducts: messageErr } = require('../helpers/messagesErros');
const { ObjectId } = require('mongodb');

const generateMessage = (msg) => {
  return ({ code: msg.code, message: msg.message, status: msg.status });
};

const validateNameRepeted = async (name) => {
  const productInDB = await productModel.getByName(name);
  if (productInDB.length) return (generateMessage(messageErr.nameRepeated));
};

const validateNameInvalidLength = (name) => {
  const minLength = 5;
  if (name.length < minLength) return (generateMessage(messageErr.nameInvalid));
};

const validateQuantity = (quantity) => {
  const valueInvalid = 0;

  if (quantity === valueInvalid) return (generateMessage(messageErr.quantityEqualZero));

  if (quantity < valueInvalid) return (generateMessage(messageErr.quantityInvalid));

  if (typeof quantity !== 'number') return (generateMessage(messageErr.quantityNAN));
};

// create
const add = async (name, quantity) => {
  const errorNameRepeted = await validateNameRepeted(name);
  const errorNameInvalidLength = validateNameInvalidLength(name);

  const errorQuantity = validateQuantity(quantity);

  if (errorNameRepeted) throw (errorNameRepeted);
  if (errorNameInvalidLength) throw (errorNameInvalidLength);
  if (errorQuantity) throw (errorQuantity);

  return (await productModel.add(name, quantity));
};

// getAll
const getAll = async () => ({ products: await productModel.getAll() });

// getById
const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw (generateMessage(messageErr.idFormatInvalid));
  const product = await productModel.getById(ObjectId(id));

  return product;
};

// getByName
const getByName = async (name) => {
  const product = await productModel.getByName(name);
  if (!product) return { message: 'not_found' };

  return product;
};

// update
const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) throw (generateMessage(messageErr.idFormatInvalid));

  const errorNameInvalidLength = validateNameInvalidLength(name);

  const errorQuantity = validateQuantity(quantity);

  if (errorNameInvalidLength) throw (errorNameInvalidLength);
  if (errorQuantity) throw (errorQuantity);

  return (await productModel.update(new ObjectId(id), name, quantity));
};

module.exports = {
  add,
  getAll,
  getByName,
  getById,
  update,
};
