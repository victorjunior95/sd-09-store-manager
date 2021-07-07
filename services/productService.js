const ProductModel = require('../models/productModel');

const isValidName = (name) => {
  if (!name || typeof name !== 'string' || name.length < Number('5')) return false;
  return true;
};

const isValidNumber = (quantity) => {
  if (!quantity || !Number.isInteger(quantity)) return false;
  return true;
};

const findByName = async(name) => {
  const product = await ProductModel.findByName(name);
  return product;
};

const create = async (name, quantity) => {
  const nameIsValid = isValidName(name);
  const numberIsValid = isValidNumber(quantity);
  const wantedName = await ProductModel.findByName(name);

  if (!nameIsValid) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  if (wantedName !== null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  if (quantity <= Number('0')) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (!numberIsValid) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }

  return ProductModel.create(name, quantity);
};

module.exports = {
  findByName,
  create,
};