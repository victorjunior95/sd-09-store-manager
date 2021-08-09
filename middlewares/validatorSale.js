const ProductService = require('../services/ProductsService');
const SalesService = require('../services/SalesService');

const isValidQuantity = (value, min) => {
  return value > min;
};

const isValidId = (req, _res, next) => {
  const { id } = req.params;
  const regexId = /[0-9A-Fa-f]{6}/g;

  if (!regexId.test(id)) {
    return next({
      code: 'not_found',
      message: 'Sale not found',
    });
  }

  next();
};

const validatorId = (req, _res, next) => {
  const { id } = req.params;
  const regexId = /[0-9A-Fa-f]{6}/g;

  if (!regexId.test(id)) {
    return next({
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    });
  }

  next();
};

const validatorIdAndQuantity = async (req, _res, next) => {
  const { body } = req;
  const regexId = /[0-9A-Fa-f]{6}/g;
  const magicNumber = 0;
  const productId = body[0].productId;
  const quantityBuy = body[0].quantity;

  const regexTest = regexId.test(productId);

  const quantityTest = isValidQuantity(quantityBuy, magicNumber);

  const isSearchProduct = await ProductService.findById(productId);

  if (!regexTest || !quantityTest || !isSearchProduct) {
    return next({
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    });
  };

  next();
};

const buyProduct = async (req, _res, next) => {
  const { body } = req;

  const productId = body[0].productId;
  const quantityBuy = body[0].quantity;

  const { quantity } = await ProductService.findById(productId);

  if (quantityBuy > quantity) return next({
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  });


  await ProductService.buyProduct(productId, quantityBuy);

  next();
};

const deleteSale = async (req, _res, next) => {
  const { id } = req.params;

  const { itensSold } = await SalesService.findById(id);

  itensSold.forEach(({ productId, quantity }) => ProductService
    .deleteSale(productId, quantity));

  next();
};

module.exports = {
  validatorIdAndQuantity,
  isValidId,
  validatorId,
  buyProduct,
  deleteSale
};
