const salesModel = require('../models/salesModel');
const assistent = require('../assistent');

const generateSaleService = async (products) => {
  const sale = await salesModel.generateSale(products);
  assistent.verifySalesQtd(sales[0].quantity);
  return sale;
};

module.exports = {
  generateSaleService,
};