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

const editOneSaleService = async (id, array) => {
  
  const editableSale = await salesModel.editOneSale(id, array);
  if (assistent.verifyQtdArray(array)) return (assistent.verifyQtdArray(array));
  if (!editableSale) return { 
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  };
  return editableSale;
};

module.exports = {
  generateSaleService,
  getAllSalesServices,
  findOneSaleService,
  editOneSaleService,
};
