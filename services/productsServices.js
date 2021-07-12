const productsModel = require('../models/productsModel');
const Joi = require('@hapi/joi');

const ERROR_STATUS = 422;
const NAME_MIN_LENGTH = 5;
const MIN_QUANTITY = 1;

const productValidationSchema = Joi.object({
  name: Joi.string().min(NAME_MIN_LENGTH).required()
    .messages({
      'string.base': '"name" should be a type of text',
      'string.empty': '"name" cannot be an empty field',
      'string.min': '"name" length must be at least 5 characters long',
      'any.required': '"name" is a required field'
    }),
  quantity: Joi.number().min(MIN_QUANTITY).required()
    .messages({
      'number.base': '"quantity" must be a number',
      'number.min': '"quantity" must be larger than or equal to 1'
    })
});

const createProduct = async (name, quantity) => {
  const validationResult = productValidationSchema
    .validate({ name, quantity }, { abortEarly: true });
  if (validationResult.error) {
    return { err: {
      code: 'invalid_data',
      message: validationResult.error.details[0].message
    } };
  }
  const foundProduct = await productsModel.productNameCheck(name);
  if (foundProduct) {
    return { err: {
      code: 'invalid_data',
      message: 'Product already exists'
    } };
  }
  return await productsModel.createProduct(name, quantity);
};

const updateProduct = async (id, name, quantity) => {
  const validationResult = productValidationSchema
    .validate({ name, quantity }, { abortEarly: true });
  if (validationResult.error) {
    return { err: {
      code: 'invalid_data',
      message: validationResult.error.details[0].message
    } };
  }
  const updatedProduct = await productsModel.updateProduct(id, name, quantity);
  if (!updatedProduct) return { err: {
    code: 'invalid_data',
    message: 'Product not found'
  } };
  return updatedProduct;
};

module.exports = {
  createProduct,
  updateProduct,
};
