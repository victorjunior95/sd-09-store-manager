const productModel = require('../models/productModel');
const minLength = 5;
const minQtd = 1;
const ZERO = 0;

const validateName = (name) => {
  if (name.length < minLength) return {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  };
};

const validateQuantity = (quantity) => {
  if (quantity < minQtd) return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1'
    }
  };
  if (typeof(quantity) !== 'number') return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number'
    }
  };
};

const addProduct = async (name, quantity) => {
  const ifExists = await productModel.findOne(name);

  if ( await ifExists)  return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }
  };
  
  if (validateName(name)) return validateName(name);

  if (validateQuantity(quantity)) return validateQuantity(quantity);

  const newProduct = productModel.create(name, quantity);
  return newProduct;  
};

const getAllProducts = async () => {
  return await productModel.findAll();
};

const getOneProductById = async (id) => {
  return await productModel.findById(id);
};

const updateOneProduct = async (id, name, quantity) => {
  if (validateName(name)) return validateName(name);
  if (validateQuantity(quantity)) return validateQuantity(quantity);
  return await productModel.findByIdAndUpdate(id, name, quantity);
};

const deleteOneProduct = async (id) => {
  const deleteProduct = await productModel.findByIdAndRemove(id);
  const deleteCount = deleteProduct.deletedCount;
  if ( deleteCount === ZERO) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    };
  };
  return deleteProduct;
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProductById,
  updateOneProduct,
  deleteOneProduct,
};
