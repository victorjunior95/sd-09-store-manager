const productModel = require('../models/productModel');
const nameExists = async (name) => {
  const product = await productModel.getProductName(name);
  const verifyName = product.filter(({name: prodName}) => prodName === name && prodName);

  if (verifyName.length > 1) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
};

module.exports = nameExists;
