const { findByName, findById } = require('../../models/productModel');

const isProductExist = async (name) => {
  const wantedName = await findByName(name);

  if (wantedName !== null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  };
  return false;
};

const isProductExistById = async (id) => {
  const product = await findById(id);

  if (product === null) {
    return {
      err: {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    };
  }
  return false;
};

module.exports = {
  isProductExist,
  isProductExistById,
};