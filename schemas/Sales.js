const errors = {
  INVALID_REQUEST: 'Wrong product ID or invalid quantity',
};

const MIN_QUANTITY = 1;
const INVALID_DATA = 'invalid_data';

const errorObject = (code, message) => {
  return { message: { err: { code, message } }, code: 422 };
};

const saleValidator = (sale) => {
  let error = false;
  sale.forEach((product) => {
    if(product.quantity < MIN_QUANTITY || typeof product.quantity !== 'number') {
      error = true;
    }
  });
  if (error) return errorObject(INVALID_DATA, errors.INVALID_REQUEST);
  return {};
};

module.exports = { saleValidator };