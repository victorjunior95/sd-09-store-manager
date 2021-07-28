const { getSaleById, getStock } = require('../models/Sales');

const errors = {
  INVALID_SALE: 'Wrong product ID or invalid quantity',
  SALE_NOTFOUND: 'Sale not found',
  INVALID_ID: 'Wrong sale ID format',
  MORE_THAN_STOCK: 'Such amount is not permitted to sell'
};

const MIN_QUANTITY = 1;
const MIN_STOCK = 0;
const INVALID_DATA = 'invalid_data';
const NOT_FOUND = 'not_found';
const STOCK_PROBLEM = 'stock_problem';
const CODE_422 = 422;
const CODE_404 = 404;

const errorObject = (code, message, codeStatus) => {
  return { message: { err: { code, message } }, code: codeStatus };
};

const saleValidator = (sale) => {
  let error = false;
  sale.forEach((product) => {
    if(product.quantity < MIN_QUANTITY || typeof product.quantity !== 'number') {
      error = true;
    }
  });
  if (error) return errorObject(INVALID_DATA, errors.INVALID_SALE, CODE_422);
  return {};
};

const idValidator = async (id) => {
  try {
    const sale = await getSaleById(id);
    if(!sale.result) return errorObject(NOT_FOUND, errors.SALE_NOTFOUND, CODE_404);
    return true;
  } catch {
    return errorObject(NOT_FOUND, errors.SALE_NOTFOUND, CODE_404);
  }
};

const deleteValidator = async (id) => {
  try {
    const sale = await getSaleById(id);
    if(!sale.result) return errorObject(INVALID_DATA, errors.INVALID_ID, CODE_422);
    return true;
  } catch {
    return errorObject(INVALID_DATA, errors.INVALID_ID, CODE_422);
  }
};

const stockValidator = async (sale) => {
  const stock = await getStock(sale[0].productId, sale[0].quantity);
  if(stock < MIN_STOCK){
    return errorObject(STOCK_PROBLEM, errors.MORE_THAN_STOCK, CODE_404);
  } 
  return {}; 
};

module.exports = {
  saleValidator,
  idValidator,
  deleteValidator,
  stockValidator
};