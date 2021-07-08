const sales = require('../models/salesModule');
const validate = require('./validateSales');

const create = async (products) => {
  products.forEach(({ quantity }) => validate.quantity(quantity));

  const itensSold = [{ itensSold: [...products] }];
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

module.exports = {
  create,
  findAll,
  findById,
};