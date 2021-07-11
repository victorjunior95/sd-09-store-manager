const productsModel = require('../models/productsModel');

async function validateName(name){
  const minimumSize = 5;
  if (name.length < minimumSize) {
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
  const product = await productsModel.getProductByName(name);
  if (product) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    };
  }
}

function validateQuantity(quantity){
  const minimumQuantity = 1;
  if (parseInt(quantity, 10) < minimumQuantity) {
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
  if (Number.isNaN(+quantity)) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        },
      },
    };
  }
}

function validateProduct(product) {
  if (!product) {
    throw {
      status: 422,
      result: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      },
    };
  }
}

async function addProduct(name, quantity) {
  await validateName(name);
  validateQuantity(quantity);
  const result = await productsModel.addProduct(name, quantity);
  return { status: 201, result };
}

async function getProducts() {
  const result = await productsModel.getProducts();
  return { status: 200, result };
}

async function getProductById(id) {
  const result = await productsModel.getProductById(id);
  validateProduct(result);
  return { status: 200, result };
}

module.exports = {
  addProduct,
  getProducts,
  getProductById,
};
