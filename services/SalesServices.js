const SalesModels = require('../models/SalesModels');

const create = async (sale) => {
  return await SalesModels.create(sale);
};

module.exports = {
  create
};