const SalesModel = require('../models/SalesModel');

const createSales = async (body) => {
  const { insertedId } = await SalesModel.createSales(body);
  
  return {
    _id: insertedId,
    itensSold: body,
  };
};

const getAllSales = async () => {
  const allSales = await SalesModel.getAllSales();

  return allSales;
};

const findById = async (id) => {
  const sale = await SalesModel.findById(id);

  return sale;
};

const editSale = async (id, body) => {
  const newSale = await SalesModel.editSale(id, body);

  return newSale;
};

const deleteSale = async (id) => {
  const sale = await SalesModel.deleteSale(id);

  return sale;
};

module.exports = {
  createSales,
  getAllSales,
  findById,
  editSale,
  deleteSale
};
