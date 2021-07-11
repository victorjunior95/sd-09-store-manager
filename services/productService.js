const productModel = require('../models/productModel');
const minLength = 5;
const minQtd = 1;

const addProduct = async (name, quantity) => {
  const ifExists = await productModel.findOne(name);

  if ( await ifExists)  return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists'
    }};
  
  if (name.length < minLength) return {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long'
    }
  };

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

  const newProduct = productModel.create(name, quantity);
  return newProduct;  
};

const getAllProducts = async () => {
  return await productModel.findAll();
};

const getOneProductById = async (id) => {
  return await productModel.findById(id);
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProductById,
};
