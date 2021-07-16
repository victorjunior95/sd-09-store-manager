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

const upDateSale = async ({ id, itensSold }) => {
  const data = await salesModel.upDateSale({ id, itensSold });
  return data;
};

const deleteSale = async (id) => {
  const deletedData = await salesModel.deleteSale(id);
  return deletedData;
};


module.exports = {
  postNewSales,
  getAllSales,
  getSalesById,
  upDateSale,
  deleteSale,
};