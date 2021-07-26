const products = require('../models/products');

const create = (product) => products.create(product)
  .then((data) => ({ status: 201, data }));

const getAll = () => products.getAll().then((data) => ({ status: 200, data }));

const getById = (id) => products.getById(id).then((data) => ({ status: 200, data }));

module.exports = { create, getAll, getById };