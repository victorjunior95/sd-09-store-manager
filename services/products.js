const productsModel = require('../models/products');

const getAll = async () => productsModel.getAll();

const create = async (name, quantity) => {
  const findByName =  await productsModel.findByName(name);
  if (findByName) return null;
  const product = await productsModel.create(name, quantity);
  return product;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product;
};

const del = async (id) => {
  const product = await productsModel.del(id);
  return product;
};

const change = async (id, name, quantity) => {
  const product = await productsModel.change(id, name, quantity);
  return product;
};


module.exports = {
  getAll,
  del,
  change,
  getById,
  create,
};