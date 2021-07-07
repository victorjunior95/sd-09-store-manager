const ProductService = require('../services/ProductsService');

const isValidQuantity = (value, min) => {
  return value > min;
};

const validatorIdAndQuantity = (req, _res, next) => {
  const { body } = req;
  const regexId = /[0-9A-Fa-f]{6}/g;
  const magicNumber = 0;

  const regexTest = body.find(({ productId }) => regexId.test(productId));

  const quantityTest = body
    .find(({ quantity }) => isValidQuantity(quantity, magicNumber));

  const isSearchProduct = body
    .find( async ({ productId }) => await ProductService.findById(productId));

  if (!regexTest || !quantityTest || !isSearchProduct) {
    return next({
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    });
  };

  next();
};

module.exports = {
  validatorIdAndQuantity
};
