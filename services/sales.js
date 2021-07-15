const sales = require('../models/sales');

const create = async (newSale) => {
  return await sales.create(newSale);
};

const getAll = async () => sales.getAll();

const change = async (id, quantity) => {
  const product = await sales.change(id, quantity);
  return product;
};

module.exports = {
  getAll,
  create,
  change,
};
