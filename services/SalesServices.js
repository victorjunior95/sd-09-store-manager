const SalesModels = require('../models/SalesModels');

const create = async (sale) => {
  const newSale = await SalesModels.create(sale);

  if (!newSale) return {
    error: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
  };

  return newSale;
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

const updateOne = async (id, body) => {
  const sale = await SalesModels.updateOne(id, body);

  return sale;
};

module.exports = {
  create,
  getAll,
  findById,
  updateOne
};