// todas as funções que dependerem de acesso ao bd precisam ser assíncronas

const { ObjectId } = require('mongodb');
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

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return {
    status: 200,
    products,
  };
};

const validateId = (id) => (ObjectId.isValid(id));
// valida se a id que está sendo passada é válida!

const getProductById = async (id) => {
  if (!validateId(id)) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
  }
  const product = await productsModel.getProductById(id);
  if (!product) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    };
  }
  return {
    status: 200,
    product,
  };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
