const productsModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

/* const MIN_CHARACTERS_NAME = 5;

const nameValidation = (name) => {
  if (name.length < MIN_CHARACTERS_NAME) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    };
  }
}; */

/* const existingProduct = async (name) => {
 
}; */

const existingProduct = async (name) => {
  const product = await productsModel.findByName(name);
  return product;

  /* if(product) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  }
  // return product; */
};

const createProduct = async (name, quantity) => {
  const newProduct = await productsModel.createProduct(name, quantity);
  return newProduct;
};

module.exports = {
  createProduct,
  existingProduct,
};
