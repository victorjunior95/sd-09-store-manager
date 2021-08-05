const Joi = require('@hapi/joi');

const model = require('../models/productModel');

const minimoNameLength = 5;
const validateProduct = Joi.object({
  name: Joi.string().min(minimoNameLength).required(),
  quantity: Joi.number().min(1).required(),
});

const create = async (name, quantity) => {
  const { error } = validateProduct.validate({ name, quantity });

  if (error) {
    return {status: 422, code: 'invalid_data', error};
  };

  const allProducts = await getAll();
  const isNameUsed = allProducts.some(product => product.name === name);

  if (isNameUsed) {
    return {
      status: 422, code: 'invalid_data', error: { message: 'Product already exists' }
    };
  }

  const newProduct = model.create(name, quantity);

  return newProduct;
};

const getAll = async () => {
  const products = await model.getAll();

  return products;
};

module.exports = {
  create,
  getAll
};
