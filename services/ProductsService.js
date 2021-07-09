const ProductsModel = require('../models/ProductsModel');
const Joi = require('joi');
const MINIMUM_CHARACTER = 5;
const MINIMUM_AMOUNT = 1;
const unprocessableEntity = 422;

const schemaProduct = Joi.object({
  name: Joi.string().min(MINIMUM_CHARACTER).required(),
  quantity: Joi.number().integer().min(MINIMUM_AMOUNT).required(),
});

const errorHandling = (status, code, message) => {
  return {
    status,
    code,
    message
  };
};

const create = async (name, quantity) => {
  const findProductName = await ProductsModel.findProductName(name);

  if(findProductName) {
    throw errorHandling(unprocessableEntity, 'invalid_data', 'Product already exists');
  }

  const { error } = schemaProduct.validate({ name, quantity });

  if(error) {
    throw errorHandling(unprocessableEntity, 'invalid_data', error.details[0].message);
  }

  const newProduct = await ProductsModel.create(name, quantity);

  return newProduct;
};

const getAll = async () => {
  const getAll = await ProductsModel.getAll();

  return getAll;
};

const getById = async (id) => {
  const product = await ProductsModel.getById(id);

  if (!product) {
    throw errorHandling(unprocessableEntity, 'invalid_data', 'Wrong id format');
  }

  return product;
};

module.exports = {
  create,
  getAll,
  getById,
};
