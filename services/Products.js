const Product = require('../models/Products');

const nameLength = 5;
const quantitySize = 0;

const create = async (name, quantity) => {
  if (name.length < nameLength) {
    return {
      error: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  const existingProduct = await Product.findByName(name);

  if (existingProduct) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    };
  }

  if (quantity < quantitySize || quantity == quantitySize) {
    return {
      error: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
  }

  if (typeof(quantity) !== 'number') {
    return {
      error: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    };
  }

  return Product.create(name, quantity);
};

module.exports = {
  create,
};
