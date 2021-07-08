const productModel = require('../models/productsModel');
const { messageErrorsProducts: messageErr } = require('../helpers/messagesErros');
const { ObjectId } = require('mongodb');
const {
  validateNameInvalidLength,
  validateQuantity,
  validateNameRepeted, generateMessage } = require('../helpers/funcValidate');

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
  const product = await productModel.getById(id);

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

  return (await productModel.update(id, name, quantity));
};

//DELETE
const exclude = async (id) => {
  if (!ObjectId.isValid(id)) throw (generateMessage(messageErr.idFormatInvalid));

  return (await productModel.exclude(ObjectId(id)));
};

module.exports = {
  add,
  getAll,
  getByName,
  getById,
  update,
  exclude,
};
