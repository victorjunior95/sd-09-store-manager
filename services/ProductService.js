const ProductModel = require('../models/ProductModel');

const nameLength = 5;

const minQuantity = 0;

const verifyNameLength = (name) => {
  if (name.length < nameLength ) {
    throw { 
      status: 422,
      error: {
        err: { 
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long', 
        } 
      }
    };
  }
};

const verifyIfProductExist = async (name) => {
  const product = await ProductModel.findByName(name);
  if (product) {
    throw { 
      status: 422,
      error: {
        err: { 
          code: 'invalid_data',
          message: 'Product already exists', 
        } 
      }
    };
  }
};

const verifyQuantity = (quantity) => {
  if (quantity <= minQuantity) {
    throw {
      status: 422,
      error: {
        err: {
          code: 'invalid_data' ,
          message: '"quantity" must be larger than or equal to 1'
        }
      }
    };
  }

  if (typeof quantity === 'string') {
    throw {
      status: 422,
      error: {
        err: {
          code: 'invalid_data' ,
          message: '"quantity" must be a number'
        }
      }
    };
  }
};

const createProduct = async (name, quantity) => {
  verifyNameLength(name);
  await verifyIfProductExist(name);
  verifyQuantity(quantity);
  const newProduct = await ProductModel.createProduct(name, quantity);
  return newProduct;
};

module.exports = {
  createProduct,
};