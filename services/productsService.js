const ProductsModel = require('../models/ProductsModel');
const status = require('./statusCode');


function errorObj(error) {
  const objectErr = { err: {code: '', message: '' } };
  objectErr.err.code = error.status;
  objectErr.err.message = error.message;
  return objectErr;
}

function verifyNameLength(name) {
  const minLength = 5;
  if (name.length < minLength) {
    return  {
      status: status.unprocessableEntity,
      message: '"name" length must be at least 5 characters length'
    };
  }
  return false;
}

function postOneProduct(name, quantity) {
  try {
    const nameBiggerThanFive = verifyNameLength(name);
    if (nameBiggerThanFive) throw nameBiggerThanFive;
    return ProductsModel.addProduct(name, quantity);
  } catch (error) {
    return errorObj(error);
  }
}

module.exports = { postOneProduct };