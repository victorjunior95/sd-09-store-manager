const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/Sale');

const create = rescue (async(req, res, next) => {
  const OK = 200;
  const soldProducts = req.body;
  const newSale = await service.create(soldProducts);
  if (newSale.error) return next(newSale.error);
  return res.status(OK).json(newSale);
});

const getAll = async (req, res) => {
  const OK = 200;
  const sales = await service.getAll();
  res.status(OK).json(sales);
};

const getOne = rescue (async (req, res, next) => {
  const OK = 200;
  const { id } = req.params;
  const sale = await service.findById(id);
  if (sale.error) return next(sale.error);
  return res.status(OK).json(sale);
});

const edit = rescue (async(req, res, next) => {
  const itens = req.body;
  const { id } = req.params;
  const OK = 200;
  const editedSale = await service.edit(id, itens);
  if (editedSale.error) return next(editedSale.error);
  return res.status(OK).json(editedSale);
});

module.exports = { create, getAll, getOne, edit };
