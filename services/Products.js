const Products = require('../models/Products');

function nameValidation(name) {
  const char = 5;
  if (name.length < char) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
}

async function nameExists(name) {
  const result = await Products.findByName(name);
  if (result) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
}

function quantityValidation(quantity) {
  if (quantity < 1) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
}

function quantityIsNumber(quantity) {
  if (typeof quantity !== 'number') {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number'
      },
    };
  }
}

async function create (name, quantity) {
  nameValidation(name);
  await nameExists(name);
  quantityValidation(quantity);
  quantityIsNumber(quantity);
  const result = await Products.create(name, quantity);
  return { status: 201, result };
};

module.exports = {
  nameValidation,
  nameExists,
  quantityValidation,
  quantityIsNumber,
  create,
};
