const modelPoducts = require('../models/products');

const create = async (name, quantity) => {
  const findName = await modelPoducts.getByName(name);
  
  if (findName) {
    return false;
  }

  const product = await  modelPoducts.create(name, quantity);

  return product;
};

const edit = async (id, name, quantity) => {
  const product = await modelPoducts.edit(id, name, quantity);

  return product;
};

const getAll = async () => {
  return await modelPoducts.getAll();
};

const getById = async (id) => {
  return await modelPoducts.getById(id);
};

module.exports = {
  create,
  edit,
  getAll,
  getById,
};