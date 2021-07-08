const { ObjectID } = require('mongodb');
const ProductsModel = require('../models/ProductsModel');
const status = require('./statusCode');


function errorObj(error) {
  const objectErr = { err: { code: '', message: '', status: ''}};
  objectErr.err.code = error.code;
  objectErr.err.message = error.message;
  objectErr.err.status = error.status;
  return objectErr;
}

function verifyNameLength(name) {
  const minLength = 5;
  if (name.length < minLength) {
    return  {
      status: status.unprocessableEntity,
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    };
  }
  return false;
}

function verifyQuantity(quantity) {
  const minQuantity = 0;
  if (Number(quantity) <= minQuantity) {
    return  {
      status: status.unprocessableEntity,
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    };
  }
  return false;
}

function verifyTypeOfQuantity(quantity) {
  const numberConverted = Number(quantity);
  if (typeof numberConverted !== typeof quantity) {
    return {
      status: status.unprocessableEntity,
      code: 'invalid_data',
      message: '"quantity" must be a number'
    };
  };
  return false;
}

async function verifyProductRepeated(name) {
  const product = await getOneProductByName(name);
  if (product) {
    return {
      status: status.unprocessableEntity,
      code: 'invalid_data',
      message: 'Product already exists'
    };
  };
  return false;
}

function verifyMongoId(id) {
  try {
    return ObjectID(id);
  } catch (error) {
    return {
      status: status.unprocessableEntity,
      code: 'invalid_data',
      message: 'Wrong id format'
    };
  }
}

async function getOneProductByName(name) {
  try {
    const productFound = await ProductsModel.findOneProductByName(name);
    return productFound;
  } catch (error) {
    return errorObj(error);
  }
}

async function getOneProductById(id) {
  try {
    const productId = verifyMongoId(id);
    if (productId.message) throw productId;
    const productFound = await ProductsModel.findOneProductById(productId);
    return productFound;
  } catch (error) {
    return errorObj(error);
  }
}

async function getAllProducts() {
  try {
    const data = await ProductsModel.findAllProducts();
    return { products: [...data] };
  } catch (error) {
    return errorObj(error);
  }
}


async function postOneProduct(name, quantity) {
  try {
    const nameBiggerThanFive = verifyNameLength(name);
    const productRepeated = await verifyProductRepeated(name);
    const quantityBiggerThanZero = verifyQuantity(quantity);
    const quantityMustBeValidNumber = verifyTypeOfQuantity(quantity);

    if (nameBiggerThanFive) throw nameBiggerThanFive;
    if (quantityBiggerThanZero) throw quantityBiggerThanZero;
    if (quantityMustBeValidNumber) throw quantityMustBeValidNumber;
    if (productRepeated) throw productRepeated;
    return await ProductsModel.addProduct(name, quantity);
  } catch (error) {
    return errorObj(error);
  }
}

module.exports = { postOneProduct, getAllProducts, getOneProductById };
