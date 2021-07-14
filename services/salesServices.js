const salesModel = require('../models/salesModel');
const assistent = require('../assistent');

const generateSaleService = async (products) => {
  const error = assistent.verifyQtdArray(products);
  if (error) return error;
  const sale = await salesModel.generateSale(products);
  return sale;
};

const getAllSalesServices = async () => {
  // if (error) return error;
  const salesList = await salesModel.getAllSales();
  return salesList;
};

const findOneSaleService = async (id) => {
  const saleList = await salesModel.findOneSale(id);
  if (!saleList) return { 
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  };
  return saleList;
};

module.exports = {
  generateSaleService,
  getAllSalesServices,
  findOneSaleService,
};
