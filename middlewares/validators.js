const products = require('../models/products');
const { ObjectID } = require('mongodb');

const checkProduct = ({ body: { name, quantity } }, _, next) => {
  const minLength = 5;
  if (name.length < minLength) return next({ status: 422, err: {
    code: 'invalid_data', message: '"name" length must be at least 5 characters long' }
  });
  if (typeof(quantity) !== 'number') return next({ status: 422, err: {
    code: 'invalid_data', message: '"quantity" must be a number' }
  });
  if (quantity < 1) return next({ status: 422, err: {
    code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' }
  });
  next();
};

const findProduct = async ({ body: { name } }, _, next) => {
  const exists = await products.getByName(name);
  if (exists) return next({ status: 422, err: {
    code: 'invalid_data', message: 'Product already exists' }
  });
  next();
};

const checkId = ({ params: { id } }, _, next) => {
  if (!ObjectID.isValid(id)) return next({ status: 422, err: {
    code: 'invalid_data', message: 'Wrong id format' }
  });
  next();
};

const checkSale = ({ body: [...itensSold] }, _, next) => {
  const minLength = 0;
  const isValid = itensSold.every(({ quantity }) =>
    (typeof(quantity) === 'number' && quantity > minLength));
  if (!isValid) return next({ status: 422, err: {
    code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
  });
  next();
};

const findSale = ({ params: { id } }, _, next) => {
  if (!ObjectID.isValid(id)) return next({ status: 404, err: {
    code: 'not_found', message: 'Sale not found' }
  });
  next();
};

const checkSaleId = ({ params: { id } }, _, next) => {
  if (!ObjectID.isValid(id)) return next({ status: 422, err: {
    code: 'invalid_data', message: 'Wrong sale ID format' }
  });
  next();
};

const checkStock = async ({ body: [...itensSold] }, _, next) => {
  const arr = await products.getAll();
  const available = itensSold.every(({ productId, quantity }) => {
    const stock = arr.find((e) => e._id.toString() === productId);
    return stock.quantity > quantity;
  });
  if (!available) return next({ status: 404, err: {
    code: 'stock_problem', message: 'Such amount is not permitted to sell' }
  });
  next();
};

module.exports = {
  checkProduct, findProduct, checkId, checkSale, findSale, checkSaleId, checkStock,
};
