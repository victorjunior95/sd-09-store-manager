const Products = require('../models/products');
const Joi = require('@hapi/joi');
const { MIN_STRING, MIN_NUMBER } = require('../constants/magicNumbers.json');
const { ObjectId } = require('mongodb');

const create = async (product) => {

  const { error } = Joi.object({
    name: Joi.string().not().empty().min(MIN_STRING).required(),
    quantity: Joi.number().not().empty().min(MIN_NUMBER).required(),
  }).validate(product, { convert: false });

  if (error) return {
    err: { code: 'invalid_data', message: error.message }
  };

  const existingProduct = await Products.findByName(product.name);

  if (existingProduct) return {
    err: { code: 'invalid_data', message: 'Product already exists' }
  };

  const { insertedId } = await Products.create(product.name, product.quantity);
  return insertedId;
};

const getAll = async () => {

  const products = await Products.getAll();

  return products;
};

const findById = async (id) => {

  if (!id) {
    return await Products.getAll();
  }

  const product = await Products.findById(id);

  return product;

};

const update = async (product) => {

  const { error } = Joi.object({
    name: Joi.string().not().empty().min(MIN_STRING).required(),
    quantity: Joi.number().not().empty().min(MIN_NUMBER).required(),
    id: Joi.string().not().empty().required(),
  }).validate(product, { convert: false });

  if (error) return {
    err: { code: 'invalid_data', message: error.message }
  };

  const existingProduct = await Products.findById(product.id);

  if (!existingProduct) return {
    err: { code: 'invalid_data', message: 'Product does not exists' }
  };

  return await Products.update(product);
};

const del = async (id) => {

  if (!ObjectId.isValid(id)) {
    return { err: { code: 'invalid_data', message: 'Wrong id format'}};
  }

  const existingProduct = await Products.findById(id);

  if (!existingProduct) return {
    err: { code: 'invalid_data', message: 'Product does not exists' }
  };

  const { name, quantity } = existingProduct;

  await Products.del(id);
  const deletedProduct = { _id: id, name, quantity };
  return deletedProduct;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  del,
};
