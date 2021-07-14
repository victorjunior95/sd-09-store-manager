const verifyField = require('../utils/verifyField');

const { 
  wrongSale,
} = require('../utils/errorMessages');

const verifySales = (sales) => {
  let error = '';
  sales.forEach(({ id, quantity }) => {
    switch (false) {
    case typeof quantity === 'number':
      error = { code: 'invalid_data', message: wrongSale };
      break;
    case verifyField.quantity(quantity):
      error = { code: 'invalid_data', message: wrongSale };
      break;
    default:
      return '';
    }
  });
  return error;
};

module.exports = verifySales;