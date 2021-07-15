const productModels = require('../../models/Products');

const validateName = async (name) => {
  const getByName = await productModels.getByName(name);
  const verifyName = getByName.filter((product) => product.name === name && product.name);
  const lengthOne = 1;

  if (verifyName.length > lengthOne) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  }
};

const validateLengthName = (name) => {
  const lengthName = 5;
  if (name.length < lengthName) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
  }
};

module.exports = {
  validateName,
  validateLengthName
};
