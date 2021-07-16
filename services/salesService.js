const salesModel = require('../models/salesModel');

const postNewSales = async (soldItens) => {
  const data = await salesModel.postNewSales(soldItens);
  return data.ops[0];
};

const getAllSales = async () => {
  const data = await salesModel.getAllSales();
  return data;
};

const getSalesById = async (id) => {
  const data = await salesModel.getSalesById(id);
  return data;
};


module.exports = {
  postNewSales,
  getAllSales,
  getSalesById,
};