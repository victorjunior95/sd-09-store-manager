const { createSales, deleteSale, getAllSales, getByIdSale,
  updateSale } = require('../models/salesModel');

const { validId, validNumber, validQuantity,
  validSearch } = require('./salesValidations');

const OK_STATUS = 200;

const create = async (newSales) => {
  validQuantity(newSales);
  validNumber(newSales);
  const result = await createSales(newSales);
  return { status: OK_STATUS, result };
};

const allSales = async () => {
  const result = await getAllSales();
  return { status: OK_STATUS, result };
};

const getById = async (id) => {
  const result = await getByIdSale(id);
  validSearch(result);
  return { status: OK_STATUS, result };
};

const updateService = async (id, updates) => {
  validQuantity(updates);
  validNumber(updates);
  const result = await updateSale(id, updates);
  return { status: OK_STATUS, result };
};

const deleteService = async (id) => {
  const result = await deleteSale(id);
  validId(result);
  return { status: OK_STATUS, result };
};

module.exports = {
  allSales,
  create,
  deleteService,
  getById,
  updateService,
};
