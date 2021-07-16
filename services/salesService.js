const salesModel = require('../models/salesModels');
const { ObjectID } = require('mongodb');

const registerSales = (sales) => {
  return salesModel.registerSales(sales);
};

const listAll = () => {
  return salesModel.listAll();
};

const listSaleId = (id) => {
  return salesModel.listSaleId(ObjectID(id));
};

module.exports = {
  registerSales,
  listAll,
  listSaleId,
};
