const sales = require('../models/salesModule');
const validate = require('./validateSales');

const create = async (products) => {
  products.forEach(({ quantity }) => validate.quantity(quantity));

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
  if (result === null) {
    throw {
      status: 404,
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }
  return result;
};

const update = async (id, products) => {
  products.forEach(({ quantity }) => validate.quantity(quantity));
  const result = await sales.update(id, products);
  return result;
};

const exclude = async (id) => {
  const result = await sales.exclude(id);
  if (result === null) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    };
  }
  return result;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
};