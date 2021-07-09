const sales = require('../services/sales');

const status_code = { ok: 200};

const create = async (req, res) => {
  const [...itensSold] = req.body;
  sales.create(itensSold).then((data) => res.status(status_code.ok).json(data));
};

const getAll = async (_req, res) => sales.getAll()
  .then((data) => res.status(status_code.ok).json(data));

const getById = async (req, res, next) => {
  const { id } = req.params;
  const data = await sales.getById(id);
  if (data.err) return next({ code: 'not_found', message: data.err });
  res.status(status_code.ok).json(data);
};

const update = async (req, res) => {
  const [...itensSold] = req.body;
  const { id } = req.params;
  sales.update(id, itensSold)
    .then(() => res.status(status_code.ok).json({ _id: id, itensSold }));
};

const remove = async (req, res) => {
  const { id } = req.params;
  sales.remove(id).then((data) => res.status(status_code.ok).json(data.value));
};

module.exports = { create, getAll, getById, update, remove };
