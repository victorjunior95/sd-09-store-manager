const products = require('../services/products');

const status_code = {
  ok: 200,
  created: 201,
};

const create = async (request, response, next) => {
  const { name, quantity } = request.body;
  const res = await products.create({ name, quantity });
  if (res.err) return next({ code: 'invalid_data', message: res.err });
  response.status(status_code['created']).json(res);
};

const getAll = async (_request, response, next) => {
  const res = await products.getAll();
  if (res.err) return next(res.err);
  response.status(status_code['ok']).json(res);
};

const getById = async (request, response, next) => {
  const { id } = request.params;
  const res = await products.getById({ id });
  if (res.err) return next({ code: 'invalid_data', message: res.err });
  response.status(status_code['ok']).json(res);
};

const update = async (request, response, next) => {
  const { name, quantity } = request.body;
  const { id } = request.params;
  const res = await products.create({ id, name, quantity });
  if (res.err) return next({ code: 'invalid_data', message: res.err });
  response.status(status_code['ok']).json(res);
};

const remove = async (request, response, next) => {
  const { id } = request.params;
  const res = await products.remove({ id });
  if (res.err) return next({ code: 'invalid_data', message: res.err });
  response.status(status_code['ok']).json(res);
};

module.exports = { create, getAll, getById, update, remove };
