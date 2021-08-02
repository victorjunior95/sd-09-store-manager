const productsModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

const MIN_CHARACTERS_NAME = 5;
const MIN_PRODUCT_AMOUNT = 0;

const existingProduct = async (name) => {
  const product = await productsModel.findByName(name);

  return product;
};

const chekName = (name) => {
  if (name.length < MIN_CHARACTERS_NAME) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    };
  }
};

const chekQuantity = (quantity) => {
  if(quantity <= MIN_PRODUCT_AMOUNT) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      }
    };
  }
};

const createProduct = async (name, quantity) => {
  if (chekName(name)) return chekName(name);
  if (chekQuantity(quantity)) return chekQuantity(quantity);
  if (await existingProduct(name)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  };

  const newProduct = await productsModel.createProduct(name, quantity);
  return newProduct;
};

module.exports = {
  createProduct,
};
