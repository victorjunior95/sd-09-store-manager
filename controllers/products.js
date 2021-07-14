const products = require('../services/products');

const create = (req, res) => products.create(req.body)
  .then(({ status, data }) => res.status(status).json(data));

const getAll = (_req, res) => products.getAll()
  .then(({ status, data }) => res.status(status).json({ 'products': data }));

const getById = (req, res) => {
  const { id } = req.params;
  products.getById(id).then(({ status, data }) => res.status(status).json(data));
};

const update = (req, res) => {
  const { id } = req.params;
  products.update(id, req.body)
    .then(({ status }) => res.status(status).json({ _id: id, ...req.body }));
};

const remove = (req, res) => {
  const { id } = req.params;
  products.remove(id).then(({ status, data }) => res.status(status).json(data));
};

module.exports = { create, getAll, getById, update, remove };
