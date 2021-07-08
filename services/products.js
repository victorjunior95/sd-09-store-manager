const Products = require('../models/products');
const rescue = require('express-rescue');

const create = async (name, quantity) => {

  const existingProduct = await Products.findByName(name);
  if (existingProduct) return { err: { message: 'Product already exists'}};

  const { insertedId } = await Products.create(name, quantity);
  return insertedId;
};

module.exports = { create };
