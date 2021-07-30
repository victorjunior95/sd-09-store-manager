const rescue = require('express-rescue');
const SalesService = require('../services/salesService');

const successStatus = 200;
const responseSuccessStatus = 201;

const create = rescue(async (req, res, next) => {
  const productsSold = req.body;
  const response = await SalesService.create(productsSold);
  if (response.message) return next(response.message);
  res.status(successStatus).json(response);
});

const getAll = rescue(async (_req, res, _next) => {
  const response = await SalesService.getAll();
  res.status(successStatus).json({ sales: response });
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await SalesService.getById(id);
  if (response.message) return next(response.message);
  res.status(successStatus).json(response);
});

const updateById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  const response = await SalesService.updateById(id, productId, quantity);
  if (response.message) return next(response.message);
  res.status(successStatus).json({ _id: id, itensSold: [{ productId, quantity }] });
});

const deleteById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const response = await SalesService.deleteById(id);
  if (response.message) return next(response.message);
  res.status(successStatus).json(response[0]);
});

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
