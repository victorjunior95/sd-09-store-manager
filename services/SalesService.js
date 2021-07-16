const SalesModel = require('../models/SalesModel');

const addSale = async (soldItens) => {

  const data = await SalesModel.addSale(soldItens);
  return data.ops[0];
};


const getAllSales = async () => {
  const allSales = await SalesModel.getAllSales();
  return allSales;
};

const findById = async (id) => {
  const sale = await SalesModel.findById(id);
  return sale;
};

const editSale = async ({id, itensSold}) => {
  const sale = await SalesModel.editSale(id, itensSold);

  return sale;
};
const deleteSale = async (id) => {
  const sale = await SalesModel.deleteSale(id);
  return sale;
};



module.exports = {
  deleteSale,
  getAllSales,
  findById,
  editSale,
  addSale,
};
