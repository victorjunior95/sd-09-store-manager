const Products = require('../models/Product');
const Joi = require('@hapi/joi');

const nameCaracters = 5;
const quantidade = 1;

const createProductSchema = Joi.object({
  name: Joi.string().min(nameCaracters)
    .message('"name" length must be at least 5 characters long').required(),
  quantity: Joi.number().min(quantidade)
    .message('"quantity" must be larger than or equal to 1').required(),
});

const getAll = async() => {
  return Products.getAll();
};

const create = async (name, quantity) => {
  const { error } = createProductSchema.validate({ name, quantity });

  if (error) { 
    return {
      code: 'invalid_data',
      error,
      status: 422,
    };
  };
  const produtoExistente = await Products.getByName(name);

  if (produtoExistente) {
    return {
      code: 'invalid_data',
      error: { message: 'Product already exists' },
      status: 422,
    };
  };

  return Products.create(name, quantity);
};
const update = async (id, name, quantity) => {
  const { error } = createProductSchema.validate({ name, quantity });

  if (error) { 
    return {
      code: 'invalid_data',
      error,
      status: 422
    };
  };

  return await Products.update(id, name, quantity);
};

const findById = async (id) => {
  const products = await Products.findById(id);

  if (!products) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
      status: 422
    };
  }

  return products;
};

const deleteOne = async (id) => {
  const products = await Products.findById(id);

  if (!products) {
    return {
      code: 'invalid_data',
      error: { message: 'Wrong id format' },
      status: 422
    };
  }
  return await Products.deleteOne(id);
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  deleteOne
}; 
