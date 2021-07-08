const productModel = require('../models/productsModel');
const { messageErrorsProducts: messageErr} = require('./messagesErros');

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


module.exports = {
  validateNameInvalidLength,
  validateNameRepeted,
  validateQuantity,
  generateMessage,
};
