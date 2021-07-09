const products = require('../models/products');

const create = async ({ name, quantity }) => products.create({ name, quantity })
  .then((res) => res.ops[0]);

const getAll = async () => products.getAll().then((res) => ({ 'products': res }));

const getById = async (id) => products.getById(id)
  .then((res) => res);

const update = async ({ id, name, quantity }) => products.update({ id, name, quantity })
  .then((res) => res.ops[0]);

const remove = async (id) => products.remove(id).then((res) => res.value);

module.exports = { create, getAll, getById, update, remove };
