const salesModel = require('../models/Sales');

const createSale = (sales) => salesModel.createSale(sales);
const getAllSales = () => salesModel.getAllSales();
const getSaleById = (id) => salesModel.getSaleById(id);

module.exports = { createSale, getAllSales, getSaleById };