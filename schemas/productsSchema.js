const productsModel = require('../models/products/productsModel');

const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  quantityInvalid: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  nameAlreadyExists: 'Product already exists',
};

const validate = async (name, quantity) => {
  const minLength = 5;
  const minQuantity = 1;

  if (name.length < minLength) {
    return { status: 422, code: 'invalid_data', message: errors.nameLength };
  }
  if (quantity < minQuantity) {
    return { status: 422, code: 'invalid_data', message: errors.quantityInvalid };
  }
  if (typeof quantity === 'string') {
    return { status: 422, code: 'invalid_data', message: errors.quantityNotNumber };
  }

  const produto = await productsModel.searchProductName(name);
  if (produto) {
    return { status: 422, code: 'invalid_data', message: errors.nameAlreadyExists };
  }

  return {};
};

module.exports = validate;
