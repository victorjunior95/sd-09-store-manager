const salesModel = require('../models/Sales');

const createSale = (sales) => salesModel.createSale(sales);
const getAllSales = () => salesModel.getAllSales();
const getSaleById = (id) => salesModel.getSaleById(id);
const editSale = (id, sale) => salesModel.editSale(id, sale);
const deleteSale = (id) => salesModel.deleteSale(id);

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  editSale,
  deleteSale
};