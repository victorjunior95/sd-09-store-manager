const Joi = require('@hapi/joi');

const model = require('../models/productModel');

const NAME_MIN_LENGTH = 5;

const validateProduct = Joi.object({
  name: Joi.string().min(NAME_MIN_LENGTH).required(),
  quantity: Joi.number().min(1).required(),
});

const create = async (name, quantity) => {
  const { error } = validateProduct.validate({ name, quantity });
  if (error) {
    return {
      status: 422,
      code: 'invalid_data',
      error
    };
  }

  const allProducts = await model.readAll();
  const nameUsed = allProducts.some(product => product.name === name);

  if (nameUsed) {
    return {
      status: 422,
      code: 'invalid_data',
      error: { message: 'Product already exists' }
    };
  }

  const newProduct = model.create(name, quantity);
  return newProduct;
};

module.exports = {
  create
};
