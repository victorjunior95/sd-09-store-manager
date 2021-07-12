const products = require('../models/products');

const findById = async (id) => {
  const product = await products.findById(id);
  return product;
};

const getAll = async () => {
  const productsList = await products.getAll();
  console.log(productsList);
  return productsList;
};

const createProduct = async (name, quantity) => {
  const { insertedId } = await products.create(name, quantity);
  return { _id: insertedId, name, quantity };
};

module.exports = { findById, getAll, createProduct };
