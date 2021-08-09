const { products: productsModel } = require('../models');
const ajv = require('../schemas/validation');
const { ObjectId } = require('mongodb');
const { AppError, errorCodes } = require('../utils');

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
      throw new AppError(errorCodes.INVALID_DATA, 'Wrong id format');
    return product;
  } else {
    throw new AppError(errorCodes.INVALID_DATA, 'Wrong id format');
  }
};

exports.updateProductService = async (id, newInfo) => {
  let updatedProduct = null;
  const validate = ajv.getSchema('productsUpdate');
  const isValid = await validate(newInfo);

  if (ObjectId.isValid(id) && isValid) {
    updatedProduct = await productsModel.updateProduct(id, newInfo);
    if (updatedProduct === null)
      throw new AppError(errorCodes.INVALID_DATA, 'Wrong id format');
    return updatedProduct;
  } else if (!ObjectId.isValid(id)) {
    throw new AppError(errorCodes.INVALID_DATA, 'Wrong id format');
  } else {
    console.log(validate.errors);
    throw new AppError(errorCodes.INVALID_DATA, validate.errors[0].message);
  }
};

exports.createService = async (product) => {
  const validate = ajv.getSchema('products');
  const isValid = await validate(product);
  return await productsModel.createProduct(product);
};
