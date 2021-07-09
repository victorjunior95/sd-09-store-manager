const productModel = require('../models/productModel');

const create = async (name, quantity,) => {
  const product = await productModel.findByName(name);

  if (product) {
    throw {
      customError: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    };
  };

  const newProduct = await productModel.create(name, quantity);

  return newProduct;
};

module.exports = { create };
