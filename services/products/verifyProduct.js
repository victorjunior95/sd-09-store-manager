const verifyField = require('../utils/verifyField');

const { 
  nameLength,
  quantityNumber,
  quantityString,
} = require('../utils/errorMessages');

const verifyProduct = async (name, quantity) => {
  switch (false) {
  case verifyField.name(name):
    return { code: 'invalid_data', message: nameLength };
  case typeof quantity === 'number':
    return { code: 'invalid_data', message: quantityString };
  case verifyField.quantity(quantity):
    return { code: 'invalid_data', message: quantityNumber };
  default:
    return '';
  }
};

module.exports = verifyProduct;
