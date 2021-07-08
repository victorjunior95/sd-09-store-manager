const { findByName } = require('../models/productModel');

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

module.exports = {
  isProductExist,
};