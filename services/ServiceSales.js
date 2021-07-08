const ModelSales = require('../model/ModelSales');

const create = async (itensSold) => {

  const createItensSold = await ModelSales.create(itensSold);

  return createItensSold;
};

module.exports = {
  create,
};
