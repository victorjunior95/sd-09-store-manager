const { products: productsModel } = require('../models');
const ajv = require('../schemas/validation');
const { ObjectId } = require('mongodb');
const { AppError, errorCodes } = require('../utils');

const WRONG_ID_MESSAGE = 'Wrong id format';

ajv.addKeyword('productNameExists', {
  async: true,
  type: 'string',
  validate: productsModel.checkNameExists,
});

exports.getAllService = async () => {
  return await productsModel.getAll();
};

exports.getByIdService = async (id) => {
  let product = null;

  if (ObjectId.isValid(id)) {
    product = await productsModel.getById(id);
    if (product === null)
      throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
    return product;
  } else {
    throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
  }
};

exports.updateProductService = async (id, newInfo) => {
  let updatedProduct = null;
  const validate = ajv.getSchema('productsUpdate');
  const isValid = await validate(newInfo);

  if (ObjectId.isValid(id) && isValid) {
    updatedProduct = await productsModel.updateProduct(id, newInfo);
    if (updatedProduct === null)
      throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
    return updatedProduct;
  } else if (!ObjectId.isValid(id)) {
    throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
  } else {
    throw new AppError(errorCodes.INVALID_DATA, validate.errors[0].message);
  }
};

exports.createService = async (product) => {
  const validate = ajv.getSchema('products');
  const isValid = await validate(product);
  return await productsModel.createProduct(product);
};

exports.deleteProductService = async (id) => {
  let product = null;

  if (ObjectId.isValid(id)) {
    deletedProduct = await productsModel.deleteProduct(id);
    if (deletedProduct === null)
      throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
    return deletedProduct;
  } else {
    throw new AppError(errorCodes.INVALID_DATA, WRONG_ID_MESSAGE);
  }
};
