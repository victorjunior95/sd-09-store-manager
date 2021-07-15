const Products = require('../models/Products');

function nameValidation(name) {
  const char = 5;
  if (name.length < char) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        },
      },
    };
  }
}

async function nameExists(name) {
  const product = await Products.fetchProduts(name);
  if (product) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        }
      }
    };
  }
}

function quantityValidation(quantity) {
  const qtt = 1;
  if (quantity < qtt) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      },
    };
  }
}

function quantityIsNumber(quantity) {
  if (quantity.type !== 'number') {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number'
        },
      },
    };
  }
}

async function create (name, quantity) {
  nameValidation(name);
  quantityValidation(quantity);
  return Products.create(name, quantity);
};

module.exports = {
  nameValidation,
  nameExists,
  quantityValidation,
  quantityIsNumber,
  create,
};
