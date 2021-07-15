const model = require('../models/Products');

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
  const product = await model.findByName(name);
  if (product) {
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

function productValidation(product) {
  if (!product) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
}

async function idValidation(id) {
  const product = await model.findById(id);
  if (!product) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  };
}

async function fetchProducts() {
  const result = await model.fetchProducts();
  return { status: 200, result };
}

async function findById(id) {
  const result = await model.findById(id);
  productValidation(result);
  return { status: 200, result };
}

async function createProduct(name, quantity) {
  nameValidation(name);
  await nameExists(name);
  quantityValidation(quantity);
  quantityIsNumber(quantity);
  const result = await model.createProduct(name, quantity);
  return { status: 201, result };
};

async function updateProduct(id, name, quantity) {
  nameValidation(name);
  quantityValidation(quantity);
  quantityIsNumber(quantity);
  await model.updateProduct(id, name, quantity);
  return { status: 200, result: { _id: id, name, quantity } };
}

async function deleteProduct(id) {
  await idValidation(id);
  const result = await model.deleteProduct(id);
  return { status: 200, result };
}

module.exports = {
  fetchProducts,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
