const { products: productsModel } = require('../models');
const ajv = require('../schemas/validation');
const { ObjectId } = require('mongodb');
const { AppError, errorCodes } = require('../utils');

ajv.addKeyword('productNameExists', {
  async: true,
  type: 'string',
  validate: productsModel.checkNameExists
});

exports.getAll = async () => {
  return await productsModel.getAll();
};

exports.getID = async (id) => {
  let product = null;

  if (ObjectId.isValid(id)) {
    product = await productsModel.getById(id);
    if (product === null) throw new AppError(errorCodes.INVALID_DATA, 'Wrong id format');
    return product;
  } else {
    throw new AppError(errorCodes.INVALID_DATA, 'Wrong id format');
  }
};

exports.create = async (product) => {
  const validate = ajv.getSchema('products');
  const isValid = await validate(product);
  return await productsModel.createProduct(product);
};
