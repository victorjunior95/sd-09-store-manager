const products = require('../models/products');
const { ObjectID } = require('mongodb');

const product = async ({ name, quantity }) => {
  const min = 5;
  let message;
  if (name.length < min) message = '"name" length must be at least 5 characters long';
  if (typeof(quantity) !== 'number') message = '"quantity" must be a number';
  if (quantity < 1) message = '"quantity" must be larger than or equal to 1';
  if (message) throw { status: 422, err: { code: 'invalid_data', message } };
};

const productExists = async ({ name }) => {
  const exists = await products.getByName(name);
  if (exists) throw { status: 422, err: {
    code: 'invalid_data', message: 'Product already exists' }
  };
};

const productId = async ({ id }) => {
  if (!ObjectID.isValid(id)) throw { status: 422, err: {
    code: 'invalid_data', message: 'Wrong id format' }
  };
};

const sale = async (itensSold) => {
  const minLength = 0;
  const isValid = itensSold.every(({ quantity }) =>
    (typeof(quantity) === 'number' && quantity > minLength));
  if (!isValid) throw { status: 422, err: {
    code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
  };
};

const saleExists = async ({ id }) => {
  if (!ObjectID.isValid(id)) throw { status: 404, err: {
    code: 'not_found', message: 'Sale not found' }
  };
};

const saleId = async ({ id }) => {
  if (!ObjectID.isValid(id)) throw { status: 422, err: {
    code: 'invalid_data', message: 'Wrong sale ID format' }
  };
};

const stock = async (itensSold) => {
  const arr = await products.getAll();
  const available = itensSold.every(({ productId, quantity }) => {
    const stock = arr.find((e) => e._id.toString() === productId);
    return stock.quantity >= quantity;
  });
  if (!available) throw { status: 404, err: {
    code: 'stock_problem', message: 'Such amount is not permitted to sell' }
  };
};

module.exports = { product, productExists, productId, sale, saleExists, saleId, stock };
