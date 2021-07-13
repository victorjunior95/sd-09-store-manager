const modelPoducts = require('../models/products');
const { messageError } = require('../middlewares/errors');

const UNPROCESSEBLEENTRY_STATUS = 422;

const create = async (name, quantity) => {
  const findName = await modelPoducts.getByName(name);
  
  if (findName) {
    throw messageError (UNPROCESSEBLEENTRY_STATUS, 'invalid_data',
      'Product already exists');
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

const remove = async (id) => {
  return await modelPoducts.remove(id);
};

module.exports = {
  create,
  edit,
  getAll,
  getById,
  remove,
};