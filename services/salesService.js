const SalesModel = require('../models/salesModel');

const create = async (data) => {
  const sale = await SalesModel.create(data);

  return sale;
};

const getAll = async () => {
  const sales = await SalesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const sale  = await SalesModel.findById(id);

  return sale
    ? sale
    : { err: { code: 'not_found', message: 'Sale not found' } };
};

const updateById = async (id, { productId, quantity }) => {
  const sale = await SalesModel.updateById(id, { productId, quantity });

  return sale;
};

const deleteById = async (id) => {
  const sale = await SalesModel.deleteById(id);

  return sale
    ? sale
    : { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
};

module.exports = {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
};
