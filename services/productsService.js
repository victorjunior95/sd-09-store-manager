// todas as funções que dependerem de acesso ao bd precisam ser assíncronas

const productsModel = require('../models/productsModel');

const validateName = async (name) => {
  const minLength = 5;
  if (name.length < minLength) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  const nameExists = await productsModel.getProductByName(name);
  if (nameExists) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
};

const validateQuantity = (quantity) => {
  const invalidQuantity = 0;
  if (quantity <= invalidQuantity) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
    };
  }
  if (Number.isNaN(parseInt(quantity, 10))) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    };
  }
};

const createProduct = async (product) => {
  const { name, quantity } = product;
  await validateName(name);
  await validateQuantity(quantity);
  const createdProduct = await productsModel.createProduct(product);
  return {
    status: 201,
    createdProduct,
  };
};

module.exports = {
  createProduct,
};
