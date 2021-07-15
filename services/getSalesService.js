const { getAllSales, insertSales, findSaleById } = require('../models/salesModels');
const { verifyQuantityArray } = require('./saleFormatValidator');
const { NOT_FOUND_SALE } = require('../errors');
const { ObjectId } = require('mongodb');

const registerSales = async (body) => {
  const verifyQuantity = verifyQuantityArray(body);
  if (verifyQuantity !== true) return verifyQuantity;

  const result = await insertSales(body);
  return { code: 200, message: result };
};

const allSalesService = async () => {
  const sales = await getAllSales();

  return {
    code: 200,
    message: {
      sales,
    },
  };
};

const findSale = async (id) => {
  if (!ObjectId.isValid(id)) return NOT_FOUND_SALE;
  const product = await findSaleById(id);

  if (product === null || product === undefined) return NOT_FOUND_SALE;

  return { code: 200, message: product };
};

module.exports = { 
  allSalesService,
  findSale,
  registerSales,
};
