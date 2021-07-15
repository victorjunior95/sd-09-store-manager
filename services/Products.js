const Products = require('../models/Products');
const Joi = require('joi');

const checkIfProductExists = async (name) => {
  const isProduct = await Products.findByName(name);

  if (isProduct) {
    throw { 
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      },
      status: 422,
    };
  }
};

const checkProductNameLength = (name) => {
  const minNameLength = 5;
  if (name.length < minNameLength) {
    throw { 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
      status: 422,
    };
  }
};

const checkProductQuantity = (quantity) => {
  // const minNameLength = 5;
  if (quantity < 1) {
    throw { 
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      },
      status: 422,
    };
  }
};

const checkQuantityType = (quantity) => {
  if (typeof quantity !== 'number') {
    throw { 
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      },
      status: 422,
    };
  }
};

const create = async (name, quantity) => {
  await checkIfProductExists(name);
  checkProductNameLength(name);
  checkProductQuantity(quantity);
  checkQuantityType(quantity);
  return Products.create(name, quantity);
};

module.exports = {
  create,
};
