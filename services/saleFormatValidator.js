const {
  INVALID_ID_OR_QUANTITY,
} = require('../errors');

const quantityVerify = (quantity) => {
  const min_quantity_value = 1;

  if (
    typeof quantity !== 'number'
    || quantity < min_quantity_value
  ) return false;

  return true;
};

const verifyQuantityArray = (body) => {
  const productsVerify = body.map(
    ({quantity}) => {
      const quantityResult = quantityVerify(quantity);

      if (!quantityResult) return 'error';

      return true;
    });

  const check = productsVerify.find((prod) => prod === 'error');
  if (check === 'error') return INVALID_ID_OR_QUANTITY;
  return true;
};

module.exports = {
  verifyQuantityArray,
};