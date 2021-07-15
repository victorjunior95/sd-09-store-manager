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

const checkProduct = (product) => {
  if (!product) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      },
      status: 422,
    };
  }
};

const getAll = async () => {
  const result = await Products.getAll();
  return {
    status: 200,
    result
  };
};

const findById = async (id) => {
  const product = await Products.findById(id);
  checkProduct(product);
  return {
    status: 200,
    product,
  };
};

const validateProductInfo = (name, quantity) => {
  checkProductNameLength(name);
  checkProductQuantity(quantity);
  checkQuantityType(quantity);
};

const create = async (name, quantity) => {
  await checkIfProductExists(name);
  validateProductInfo(name, quantity);
  const newProduct = await Products.create(name, quantity);
  return {
    status: 201,
    newProduct
  };
};

const updateProduct = async (id, name, quantity) => {
  validateProductInfo(name, quantity);
  const updatedProduct = await Products.updateProduct(id, name, quantity);
  console.log(updatedProduct);
  return {
    status: 200,
    updatedProduct
  };
};

module.exports = {
  create,
  getAll,
  findById,
  updateProduct,
};