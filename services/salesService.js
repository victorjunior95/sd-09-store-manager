const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const create = async (sales) => {
  return createdSales.ops[0];
};

const getAllSales = async () => {
  const allSales = { sales: await salesModel.getAllSales() };
  return allSales;
};

const getSaleById = (id) => {
  const validId = ObjectId(id);
  return salesModel.getSaleById(validId);
};

const updateSale = (id, data) => {
  return salesModel.updateSale(id, data);
};

const deleteSale = (id) => {
  return salesModel.deleteSale(id);
};

module.exports = {
  create,
  deleteSale,
  getAllSales,
  getSaleById,
  updateSale,
};
