const Joi = require('@hapi/joi');

const model = require('../models/productModel');

const minimoNameLength = 5;
const unprocessableEntity = 422;

const validateProduct = Joi.object({
  name: Joi.string().min(minimoNameLength).required(),
  quantity: Joi.number().min(1).required(),
});

const create = async (name, quantity) => {
  const { error } = validateProduct.validate({ name, quantity });

  if (error) {
    return {
      status: unprocessableEntity,
      code: 'invalid_data',
      error
    };
  };

  const allProducts = await getAll();
  const isNameUsed = allProducts.some(product => product.name === name);

  if (isNameUsed) {
    return {
      status: unprocessableEntity,
      code: 'invalid_data',
      error: { message: 'Product already exists' }
    };
  }

  const newProduct = model.create(name, quantity);

  return newProduct;
};

const getAll = async () => {
  const products = await model.getAll();

  return products;
};

const getById = async (id) => {
  const product = await model.getById(id);

  if (!product) {
    return {
      status: unprocessableEntity,
      code: 'invalid_data',
      error: { message: 'Wrong id format' }
    };
  }

  return product;
};

const update = async (id, name, quantity) => {
  const { error } = validateProduct.validate({ name, quantity });

  if (error) {
    return {
      status: UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error
    };
  };

  const updateProduct = await model.update(id, name, quantity);

  return updateProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
