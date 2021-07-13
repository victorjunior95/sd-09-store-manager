const product = require('../models/productModel');
const validation = require('../validation');

const createProduct = async (name, quantity) => {

  if (!validation.isValidName(name)) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      }
    };
  };

  if (!validation.isInteger(quantity)) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1'
      }
    };
  };

  if (!validation.isNumber(quantity)) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be a number'
      }
    };
  };

  if (!validation.isMustBeZero) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1'
      }
    };
  }

  // if (!unique) {
  //   return {
  //     'err': {
  //       'code': 'invalid_data',
  //       'message': 'Product already exists'
  //     }
  //   };
  // }

  const newProduct = await product.createProduct(name, quantity);
  return newProduct;
};

const updateProduct = async (id, name, quantity) => {
  if (!validation.isValidName(name)) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': '"name" length must be at least 5 characters long'
      }
    };
  };

  if (!validation.isMustBeZero) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be larger than or equal to 1'
      }
    };
  }

  if (!validation.isNumber(quantity)) {
    return {
      'err': {
        'code': 'invalid_data',
        'message': '"quantity" must be a number'
      }
    };
  };

  const item = await product.updateProduct(id, name, quantity);
  return item;
};

const deleteProduct = async (id) => {
  const minLength = 24;
  if (id.length < minLength) return {
    'err': {
      'code': 'invalid_data', 'message': 'Wrong id format'
    }
  };

  const item = await product.deleteProduct(id);
  return item;
};

const listProductById = async (id) => {
  const minLength = 24;

  if (id.length < minLength) return {
    'err': {
      'code': 'invalid_data', 'message': 'Wrong id format'
    }
  };
  const list = await product.listProductById(id);
  return list;
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  listProductById
};