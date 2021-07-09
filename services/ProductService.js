const ProductModel = require('../models/ProductModel');

async function validateNameAvailability(name) {
  const getByNameResp = await ProductModel.getByName(name);
  if (getByNameResp) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return {};
}

async function create(data) {
  const dataValidation = await validateNameAvailability(data.name);
  if (dataValidation.err) {
    return dataValidation;
  }
  const newProduct = await ProductModel.create(data);
  return newProduct;
}

module.exports = { create };
