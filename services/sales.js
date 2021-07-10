const modelPoducts = require('../models/products');
const modelSales = require('../models/sales');

const create = async (itensSold) => {
//   const findName = await modelPoducts.getByName(name);
//   if (findName) {
//     return false;
//   }

  const sale = await  modelSales.create(itensSold);

  return sale;
};

const edit = async (itensSold) => {
  const sale = await modelSale.edit(itensSold);

  return sale;
};

const getAll = async () => {
  return await modelSales.getAll();
};

const getById = async (id) => {
  return await modelSales.getById(id);
};

const remove = async (id) => {
  return await modelSales.remove(id);
};

module.exports = {
  create,
  edit,
  getAll,
  getById,
  remove,
};