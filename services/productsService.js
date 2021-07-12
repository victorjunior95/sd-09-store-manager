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

const updateProduct = async (id, name, quantity) => {
  const { matchedCount } = await products.update(id, name, quantity);
  if(matchedCount) {
    return { _id: id, name, quantity };
  }
  return {err: {code: 'bd_acess_error', message: 'Erro ao atualizar produto'}};
};

module.exports = { findById, getAll, createProduct, updateProduct };
