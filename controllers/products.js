const products = require('../services/products');

const create = (req, res) => products.create(req.body)
  .then(({ status, data }) => res.status(status).json(data));

const getAll = (_req, res) => products.getAll()
  .then(({ status, data }) => res.status(status).json({ 'products': data }));

const getById = (req, res) => products.getById(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = { create, getAll, getById };