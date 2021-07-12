const { ObjectId } = require('mongodb');
const products = require('../models/products');

const errorsMessages = {
  nameTooShort: '"name" length must be at least 5 characters long',
  productExists: 'Product already exists',
  quantityTooLow: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  wrongIdFormat: 'Wrong id format',
};

const errorsCodes = {
  invalid_data: 'invalid_data',
};

const responseCodes = {
  success: 200,
  created: 201,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
};

const fieldMinValues = {
  nameLength: 5,
  quantity: 1,
};

const isBlank = (value) => (!value);
const isString = (value) => (typeof value === 'string');
const isLowerthanMinValue = (value, min) => (value < min);
const isNotUnique = async (name, id) => {
  if (id) {
    return false;
  }
  const product = await products.findByName(name);
  if (!product) return false;
  return true;
};

const validateProduct = async (id, name, quantity) => {
  switch (true) {
  case isBlank(name) || isLowerthanMinValue(name.length, fieldMinValues.nameLength):
    return { response: responseCodes.unprocessableEntity,
      err: { code: errorsCodes.invalid_data, message: errorsMessages.nameTooShort } };
  case await isNotUnique(name, id):
    return { response: responseCodes.unprocessableEntity,
      err: { code: errorsCodes.invalid_data, message: errorsMessages.productExists } };
  case isString(quantity):
    return { response: responseCodes.unprocessableEntity,
      err: {
        code: errorsCodes.invalid_data, message: errorsMessages.quantityNotNumber } };
  case isLowerthanMinValue(quantity, fieldMinValues.quantity):
    return { response: responseCodes.unprocessableEntity,
      err: { code: errorsCodes.invalid_data, message: errorsMessages.quantityTooLow } };
  default:
    return {};
  }
};

const idIsNotValid = (id) => {
  if(!ObjectId.isValid(id)) {
    return { response: responseCodes.unprocessableEntity,
      err: { code: errorsCodes.invalid_data, message: errorsMessages.wrongIdFormat } };
  }
};

const isProductObject = (product) => (!product);

module.exports = {
  validateProduct,
  idIsNotValid,
  isProductObject,
  responseCodes,
  errorsMessages,
  errorsCodes
};
