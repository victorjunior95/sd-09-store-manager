const sales = require('../services/sales');

const create = (req, res) => {
  const [...itensSold] = req.body;
  sales.create(itensSold).then(({ status, data }) => res.status(status).json(data));
};

const getAll = (_req, res) => sales.getAll()
  .then(({ status, data }) => res.status(status).json({ 'sales': data }));

const getById = (req, res, next) => {
  const { id } = req.params;
  sales.getById(id).then(({ status, data }) => data ? res.status(status).json(data)
    : next({ status: 404, err: { code: 'not_found', message: 'Sale not found' }}));
};

const update = (req, res) => {
  const [...itensSold] = req.body;
  const { id } = req.params;
  sales.update(id, itensSold)
    .then(({ status }) => res.status(status).json({ _id: id, itensSold }));
};

const remove = (req, res) => {
  const { id } = req.params;
  sales.remove(id).then(({ status, data }) => res.status(status).json(data));
};

module.exports = { create, getAll, getById, update, remove };
