const products = require('../models/products');
const { ObjectID } = require('mongodb');

const err = (code, message) => ({ code, message });

const product = async ({ name, quantity }) => {
  const min = 5;
  let message;
  if (name.length < min) message = '"name" length must be at least 5 characters long';
  if (typeof(quantity) !== 'number') message = '"quantity" must be a number';
  if (quantity < 1) message = '"quantity" must be larger than or equal to 1';
  if (message) throw err('invalid_data', message);
};

const productExists = async ({ name }) => {
  const exists = await products.getByName(name);
  if (exists) throw err('invalid_data', 'Product already exists');
};

const productId = async (id) => {
  if (!ObjectID.isValid(id)) throw err('invalid_data', 'Wrong id format');
};



module.exports = { product, productExists, productId };