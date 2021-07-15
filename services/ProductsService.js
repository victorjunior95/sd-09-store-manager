const { createProduct, findByName } = require('../models/ProductsModel');

const objErrorToReturn = (typeError) => {
  return {
    err: {
      code: 'invalid_data',
      message: typeError,
    },
  };
};
const createService = (name, quantity) => {
  const numberToComperName = 5;

  if (name.length < numberToComperName) {
    return objErrorToReturn('name length must be at least 5 characters long');
  }
  if (findByName(name)) {
    return objErrorToReturn('Product already exists');
  }
  if (quantity < 1) {
    return objErrorToReturn('quantity must be larger than or equal to 1');
  }

  const newProduct = createProduct(name, quantity);
  return newProduct;
};

module.exports = {
  createService,
};
