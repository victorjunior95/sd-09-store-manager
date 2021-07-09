const { ObjectId } = require('mongodb');
const Joi = require('joi');
const productsModel = require('../models/productsModel');
const response = require('../middlewares/responseCodes');

const minNameLength = 5;
const minQuantity = 1;
const PRODUCT_SCHEMA = Joi.object({
  name: Joi.string().min(minNameLength).required(),
  quantity: Joi.number().min(minQuantity).required(),
});

const getAllProducts = async () => {
  return productsModel.getAllProducts();
};

const createNewProduct = async (newProduct) => {
  const validateNewProduct = PRODUCT_SCHEMA.validate(newProduct);
  // console.log(validateNewProduct.error.details);
  if (validateNewProduct.error) {
    throw ({
      err: {
        err: {
          code: 'invalid_data',
          message: validateNewProduct.error.details[0].message
        },
      },
      code: response.INVALID_DATA,
    });
  }
  const addedProduct = await productsModel.createNewProduct(newProduct);
  console.log(addedProduct);
  if(addedProduct.err) throw(addedProduct);
  return addedProduct;
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

const updateProduct = async (name, quantity, id) => {
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
  return productsModel.updateProduct(name, quantity, id);
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    const errorObj = {
      err: {
        code:'invalid_data',
        message: 'Wrong id format'
      }
    };
    return errorObj;
  }
  return productsModel.deleteProduct(id);
};

module.exports = {
  getAllProducts,
  createNewProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
