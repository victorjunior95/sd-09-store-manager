const Products = require('../models/products');
const rescue = require('express-rescue');

const create = rescue(async (name, quantity) => {

  const existingProduct = await Products.findByName(name);

  if (existingProduct) return { error: { message: 'Product already exists'}};
  return newProduct;
  return err;
});

module.exports = { create };
