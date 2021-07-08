const productsModel = require('../models/productsModel');

const add = async (name, quantity) => await productsModel.add(name, quantity);

const getAll = async () => await productsModel.getAll()
  .then((data) => ({ products: data }));

const getById = async (id) => await productsModel.getById(id);

const update = async (id, name, quantity) => (
  await productsModel.update(id, name, quantity)
);

const remove = async (id) => productsModel.remove(id);


module.exports = {
  add,
  getAll,
  getById,
  update,
  remove
};
