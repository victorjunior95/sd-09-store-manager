const sales = require('../models/sales');

const create = async (newSale) => {
  return await sales.create(newSale);
};

const getAll = async () => sales.getAll();

module.exports = {
  getAll,
  create,

};
