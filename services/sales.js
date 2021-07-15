const sales = require('../models/sales');

const create = async (newSale) => {
  return await sales.create(newSale);
};

const getAll = async () => sales.getAll();

const change = async (id, quantity) => {
  const product = await sales.change(id, quantity);
  return product;
};


const getById = async (id) => {
  const sale = await sales.getById(id);
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  change,
};
