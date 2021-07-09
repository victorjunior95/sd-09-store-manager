const products = require('../models/products');
const { ObjectID } = require('mongodb');

const message = {
  invalidName: '"name" length must be at least 5 characters long',
  invalidQuantityType: '"quantity" must be a number',
  invalidQuantity: '"quantity" must be larger than or equal to 1',
  productExists: 'Product already exists',
  invalidId: 'Wrong id format',
  saleNotFound: 'Sale not found',
  invalidSale: 'Wrong product ID or invalid quantity',
  invalidSaleId: 'Wrong sale ID format',
};

const checkProduct = (req, _res, next) => {
  const { name, quantity } = req.body;
  const minLength = 5;
  if (name.length < minLength) {
    return next({ code: 'invalid_data', message: message.invalidName });
  };
  if (typeof(quantity) !== 'number') {
    return next({ code: 'invalid_data', message: message.invalidQuantityType });
  };
  if (quantity < 1) {
    return next({ code: 'invalid_data', message: message.invalidQuantity });
  };
  return next();
};

const findProduct = async (req, _res, next) => {
  const { name } = req.body;
  const exists = await products.getAll().then((arr) => arr.some((p) => p.name === name));
  if (exists) return next({ code: 'invalid_data', message: message.productExists });
  return next();
};

const checkId = (req, _res, next) => {
  const { id } = req.params;
  if (ObjectID.isValid(id)) return next();
  return next({ code: 'invalid_data', message: message.invalidId });
};

const checkSale = (req, _res, next) => {
  const [...itensSold] = req.body;
  const minLength = 0;
  const isValid = itensSold.every(({ quantity }) =>
    (typeof(quantity) === 'number' && quantity > minLength));
  if (!isValid) return next({ code: 'invalid_data', message: message.invalidSale });
  return next();
};

const checkSaleId = (req, _res, next) => {
  const { id } = req.params;
  if (ObjectID.isValid(id)) return next();
  return next({ code: 'invalid_data', message: message.invalidSaleId });
};

module.exports = { checkProduct, findProduct, checkId, checkSale, checkSaleId };
