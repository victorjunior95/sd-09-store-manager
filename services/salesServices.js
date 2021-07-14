const salesModel = require('../models/salesModel');
const assistent = require('../assistent');

const generateSaleService = async (products) => {
  console.log(products);
  const error = assistent.verifyQtdArray(products);
  if (error) return error;
  const sale = await salesModel.generateSale(products);
  return sale;
};

module.exports = {
  generateSaleService,
};
