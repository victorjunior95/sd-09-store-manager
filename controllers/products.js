const products = require('../services/products');

const status_code = { ok: 200, created: 201 };

const create = async (req, res) => {
  const { name, quantity } = req.body;
  products.create({ name, quantity })
    .then((data) => res.status(status_code.created).json(data));
};

const getAll = async (_req, res) => products.getAll()
  .then((data) => res.status(status_code.ok).json(data));

const getById = async (req, res) => {
  const { id } = req.params;
  products.getById(id).then((data) => res.status(status_code.ok).json(data));
};

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  products.create({ id, name, quantity })
    .then((data) => res.status(status_code.ok).json(data));
};

const remove = async (req, res) => {
  const { id } = req.params;
  products.remove(id).then((data) => res.status(status_code.ok).json(data));
};

module.exports = { create, getAll, getById, update, remove };
