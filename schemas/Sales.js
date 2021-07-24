const { getSaleById } = require('../models/Sales');

const errors = {
  INVALID_REQUEST: 'Wrong product ID or invalid quantity',
  SALE_NOTFOUND: 'Sale not found'
};

const MIN_QUANTITY = 1;
const INVALID_DATA = 'invalid_data';
const NOT_FOUND = 'not_found';
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
  if (error) return errorObject(INVALID_DATA, errors.INVALID_REQUEST, CODE_422);
  return {};
};

const idValidator = async (id) => {
  try {
    await getSaleById(id);
    return true;
  } catch {
    return errorObject(NOT_FOUND, errors.SALE_NOTFOUND, CODE_404);
  }
};

module.exports = { saleValidator, idValidator };