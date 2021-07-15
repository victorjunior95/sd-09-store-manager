const ProductsService = require('../services/ProductsService');

const checkQuantity = (value, min) => {
  return value > min;
};

const validatorIdAndQuantity = (req, _res, next) => {
  const {body} = req;
  const regexId = /[0-9A-Fa-f]{6}/g;
  const number = 0;

  const regexTest = body.find(({ productId }) => regexId.test(productId));

  const quantityTest = body.find(({ quantity }) => checkQuantity(quantity, number));

  const searchProduct = body.find( async ({ productId }) =>
    await ProductsService.getProductById(productId));

  if (!regexTest || !quantityTest || !searchProduct ) {
    return next ({
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    });
  };
  next();
};

module.exports = {
  validatorIdAndQuantity,
};

