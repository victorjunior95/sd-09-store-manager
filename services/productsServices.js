const productsModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');
const response = require('../middlewares/responseCodes');

const getAllProducts = async () => {
  return productsModel.getAllProducts();
};

const createNewProduct = (name, quantity) => {
  const minNameLength = 5;
  const minQuantityLength = 1;
  if (name.length < minNameLength) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
    return errorObj;
  }
  if (quantity < minQuantityLength) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: '"quantity" must be larger than or equal to 1'
      }
    };
    return errorObj;
  }
  if (typeof quantity !== 'number') {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: '"quantity" must be a number'
      }
    };
    return errorObj;
  }
  return productsModel.createNewProduct(name, quantity);
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: 'Wrong id format'
      }
    };
    return errorObj;
  }
  return productsModel.getProductById(id);
};

module.exports = {
  getAllProducts,
  createNewProduct,
  getProductById,
};
