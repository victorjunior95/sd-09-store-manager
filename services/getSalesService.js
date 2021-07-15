const {
  getAllSales,
  insertSales,
  findSaleById,
  deleteById,
} = require('../models/salesModels');
const { verifyQuantityArray } = require('./saleFormatValidator');
const { NOT_FOUND_SALE, INVALID_SALE_ID } = require('../errors');
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

const deleteSale = async (id) => {
  const { code, message } = await findSale(id);

  if (code === NOT_FOUND_SALE.code) return INVALID_SALE_ID;
  
  await deleteById(id);

  return { code: code, message: message };
};

module.exports = { 
  allSalesService,
  findSale,
  registerSales,
  deleteSale,
};
