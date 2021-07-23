const productsModel = require('../models/Products');

const create = (name, quantity) => productsModel.create(name, quantity);

const getAll = () => productsModel.getAll();

const getById = (id) => productsModel.getById(id);

module.exports = {
  create,
  getAll,
  getById
};