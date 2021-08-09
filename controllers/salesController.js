const rescue = require('express-rescue');
const StoreService = require('../services/storeService');

const successStatus = 200;
const responseSuccessStatus = 201;

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const response = await StoreService.create(name, quantity);
  if (response.isJoi) {
    return next(response.details[0].message);
  }
  if (response.message) {
    return next(response.message);
  }
  res.status(responseSuccessStatus).json(response);
});

const getAll = rescue(async (_req, res, _next) => {
  const response = await StoreService.getAll();
  res.status(successStatus).json({ products: response });
});

const getByIdOrName = rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await StoreService.getByIdOrName(id);
  if (response.message) return next(response.message);
  res.status(successStatus).json(response);
});

const updateById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const response = await StoreService.updateById(id, name, quantity);
  if (response.isJoi) return next(response.details[0].message);
  if (response.message) return next(response.message);
  res.status(successStatus).json({ _id: id, name, quantity });
});

const deleteById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await StoreService.deleteById(id);
  if (response.message) return next(response.message);
  res.status(successStatus).json(response);
});

module.exports = {
  create,
  getAll,
  getByIdOrName,
  updateById,
  deleteById,
};
