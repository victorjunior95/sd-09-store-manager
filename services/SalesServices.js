const SalesModels = require('../models/SalesModels');

const create = async (sale) => {
  return await SalesModels.create(sale);
};

const getAll = async () => {
  return await SalesModels.getAll();
};

const findById = async (id) => {
  const sale = await SalesModels.findById(id);

  if (!sale) {
    return {
      error: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  }

  return sale;
};

module.exports = {
  create,
  getAll,
  findById
};