const sales = require('../models/salesModule');
const validate = require('./validateSales');

const create = async (products) => {
  validate.quantity(products);
  const itensSold = { itensSold: [...products] };
  const result = await sales.create(itensSold);
  return result;
};

const findAll = async () => {
  const result = await sales.findAll();
  return result;
};

const findById = async (id) => {
  const result = await sales.findById(id);
  validate.byId(result);
  return result;
};

const update = async (id, products) => {
  validate.quantity(products);
  const result = await sales.update(id, products);
  return result;
};

const exclude = async (id) => {
  const result = await sales.exclude(id);
  validate.excludeId(result);
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
};
