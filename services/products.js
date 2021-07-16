const { ObjectId } = require('mongodb');

const productModel = require('../models/products');
const { validateName, validateQuantityforProducts } = require('./validations');

const HTTP_STATUS_UNPROCESSABLE_ENTITY = 422;

const getAllProducts = async () => {
  const productsList = await productModel.getAllProductsDB();
  return productsList;
};

const getProductById = async (id) => {
  if(!ObjectId.isValid(id)) return {
    status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };

  const product = await productModel.getProductByIdDB(id);
  return product;
};

const addProduct = async (name, quantity) => {
  const productExists = await productModel.getByNameDB(name);

  if (productExists)
    return {
      status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };

  const verifyName = await validateName(name);
  const verifyQuantity = validateQuantityforProducts(quantity);
  
  if (verifyName.isValid && verifyQuantity.isValid) {
    const product = await productModel.addProductDB(name, quantity);
    return product;
  }

  return verifyName.err ? verifyName : verifyQuantity;
};

const updateProduct = async (id, name, quantity) => {
  const verifyName = await validateName(name);
  const verifyQuantity = validateQuantityforProducts(quantity);

  if(!ObjectId.isValid(id)) return {
    status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };

  if (verifyName.isValid && verifyQuantity.isValid) {
    const product = await productModel.editProductDB(id, name, quantity);
    return product;
  }

  return verifyName.err ? verifyName : verifyQuantity;  
};

const deleteProduct = async (id) => {
  if(!ObjectId.isValid(id)) return {
    status: HTTP_STATUS_UNPROCESSABLE_ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };

  const result = await productModel.deleteProductDB(id);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
