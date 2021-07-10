const productModels = require('../../models/Products');

const validateName = async (name) => {
  const getByName = await productModels.getByName(name);
  const verifyName = getByName.filter((product) => product.name === name && product.name);
  const lengthName = 5;
  const lengthZero = 0;
  if (name.length < lengthName) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      }
    };
  }
  if (verifyName.length > lengthZero) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists'
      }
    };
  }
};

module.exports = validateName;
