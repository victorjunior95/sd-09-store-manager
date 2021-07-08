const productModel = require('../models/productModel');
const Joi = require('@hapi/joi');

const minCharacter = 5;
const minQuant = 1;

const createProductSchema = Joi.object({
  name: Joi.string().min(minCharacter)
    .message('"name" length must be at least 5 characters long').required(),
  quantity: Joi.number().min(minQuant)
    .message('"quantity" must be larger than or equal to 1').required(),
});

const create = async (name, quantity) => {
  const { error } = createProductSchema.validate({ name, quantity });

  if (error) {
    return {
      code: 'invalid_data',
      error,
      status: 422,
    };
  };
  const existingProduct = await productModel.findProductbyName(name);

  if (existingProduct) {
    return {
      code: 'invalid_data',
      error: { message: 'Product already exists' },
      status: 422,
    };
  }

  return productModel.create(name, quantity);
};

const getAll = async () => {
  return await productModel.getAll();
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) {
    return {
      code: 'invalid_data',
      error: { message: 'Product already exists' },
      status: 422,
    };
  }

  return product;
};

module.exports = {
  create,
  getAll,
  getById
};