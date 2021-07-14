const products = require('../models/products');

const findById = async (id) => {
  const product = await products.findById(id);
  return product;
};

const getAll = async () => {
  const productsList = await products.getAll();
  return productsList;
};

const createProduct = async (name, quantity) => {
  const { insertedId } = await products.create(name, quantity);
  return { _id: insertedId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  const { matchedCount } = await products.update(id, name, quantity);
  if(matchedCount) {
    return { _id: id, name, quantity };
  }
  return {err: {code: 'bd_acess_error', message: 'error trying update product'}};
};

const deleteProduct = async (id) => {
  const product = await products.findById(id);
  if (!product) {
    return { err: {code: 'invalid_data', message: 'Wrong id format'} };
  }
  await products.remove(id);
  const { name, quantity } = product;
  return { _id: id, name, quantity };
};

module.exports = { findById, getAll, createProduct, updateProduct, deleteProduct };
