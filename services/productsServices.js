const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');
const WRONG_ID_FORMAT = 'Wrong id format';

const validateNameLength = async (name) => {
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
};

const validateIfNameExists = async (name) => {
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
  await validateNameLength(name);
  await validateIfNameExists(name);
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

const getProductById = async (id) => {
  if (!validateId(id)) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: WRONG_ID_FORMAT,
      }
    };
  }
  const product = await productsModel.getProductById(id);
  if (!product) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: WRONG_ID_FORMAT,
      }
    };
  }
  return {
    status: 200,
    product,
  };
};

const editProduct = async (id, product) => {
  const { name, quantity } = product;
  if (!validateId(id)) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: WRONG_ID_FORMAT,
      }
    };
  }
  await validateNameLength(name);
  await validateQuantity(quantity);
  const editedProduct = await productsModel.editProduct(id, product);
  return {
    status: 200,
    editedProduct,
  };
};

const validateIfProductExists = async (id) => {
  const productExists = await productsModel.getProductById(id);
  if (!productExists) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: WRONG_ID_FORMAT,
      }
    };
  }
  return productExists;
};

const deleteProduct = async (id) => {
  if (!validateId(id)) {
    throw {
      status: 422,
      err: {
        code: 'invalid_data',
        message: WRONG_ID_FORMAT,
      }
    };
  }
  const deletedProduct = validateIfProductExists(id);
  const checkDelete = await productsModel.deleteProduct(id);
  if (!checkDelete) {
    return {
      status: 200,
      deletedProduct,
    };
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  editProduct,
  deleteProduct,
};
