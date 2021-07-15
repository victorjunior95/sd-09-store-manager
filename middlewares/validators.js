const products = require('../models/products');
const { ObjectID } = require('mongodb');

const product = ({ body: { name, quantity } }, _, next) => {
  const min = 5;
  let message;
  if (name.length < min) message = '"name" length must be at least 5 characters long';
  if (typeof(quantity) !== 'number') message = '"quantity" must be a number';
  if (quantity < 1) message = '"quantity" must be larger than or equal to 1';
  return message ? next({ status: 422, err: { code: 'invalid_data', message } }) : next();
};

const productExists = async ({ body: { name } }, _, next) => {
  const exists = await products.getByName(name);
  if (exists) return next({ status: 422, err: {
    code: 'invalid_data', message: 'Product already exists' }
  });
  next();
};

const productId = ({ params: { id } }, _, next) => {
  if (!ObjectID.isValid(id)) return next({ status: 422, err: {
    code: 'invalid_data', message: 'Wrong id format' }
  });
  next();
};

const sale = ({ body: [...itensSold] }, _, next) => {
  const minLength = 0;
  const isValid = itensSold.every(({ quantity }) =>
    (typeof(quantity) === 'number' && quantity > minLength));
  if (!isValid) return next({ status: 422, err: {
    code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
  });
  next();
};

const saleExists = ({ params: { id } }, _, next) => {
  if (!ObjectID.isValid(id)) return next({ status: 404, err: {
    code: 'not_found', message: 'Sale not found' }
  });
  next();
};

const saleId = ({ params: { id } }, _, next) => {
  if (!ObjectID.isValid(id)) return next({ status: 422, err: {
    code: 'invalid_data', message: 'Wrong sale ID format' }
  });
  next();
};

const stock = async ({ body: [...itensSold] }, _, next) => {
  const arr = await products.getAll();
  const available = itensSold.every(({ productId, quantity }) => {
    const stock = arr.find((e) => e._id.toString() === productId);
    return stock.quantity >= quantity;
  });
  if (!available) return next({ status: 404, err: {
    code: 'stock_problem', message: 'Such amount is not permitted to sell' }
  });
  next();
};

module.exports = { product, productExists, productId, sale, saleExists, saleId, stock };
