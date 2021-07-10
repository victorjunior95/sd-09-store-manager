const products = require('../models/productsModule');
const validate = require('./validateProducts');

const create = async (product) => {
  await validate.name(product.name);
  validate.quantity(product.quantity);
  const result = await products.create(product);
  return result;
};

const findAll = async () => {
  const result = await products.findAll();
  return result;
};

const findById = async (id) => {
  const result = await products.findById(id);
  validate.id(result);
  return result;
};

const update = async (product) => {
  validate.quantity(product.quantity);
  await validate.name(product.name);
  const result = await products.update(product);
  return result;
};

const exclude = async (id) => {
  const result = await products.exclude(id);
  validate.id(result);
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
};
