const productsModel = require('../models/Products');

const create = (name, quantity) => productsModel.create(name, quantity);
const getAll = () => productsModel.getAll();
const getById = (id) => productsModel.getById(id);
const edit = (id, name, quantity) => productsModel.edit(id, name, quantity);
const deleteProduct = (id) => productsModel.deleteProduct(id);

module.exports = {
  create,
  getAll,
  getById,
  edit,
  deleteProduct
};