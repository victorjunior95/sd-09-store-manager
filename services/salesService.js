const salesModel = require('../models/salesModel');

const salesValidations = require('./salesValidations');

const OK_STATUS = 200;

const create = async (newSales) => {
  salesValidations.validQuantity(newSales);
  salesValidations.validNumber(newSales);
  const result = await salesModel.createSales(newSales);
  return { status: OK_STATUS, result };
};

const allSales = async () => {
  const result = await salesModel.getAllSales();
  return { status: OK_STATUS, result };
};

const getById = async (id) => {
  const result = await salesModel.getByIdSale(id);
  salesValidations.validSearch(result);
  return { status: OK_STATUS, result };
};

const updateService = async (id, updates) => {
  salesValidations.validQuantity(updates);
  salesValidations.validNumber(updates);
  const result = await salesModel.updateSale(id, updates);
  return { status: OK_STATUS, result };
};

const deleteService = async (id) => {
  const result = await salesModel.deleteSale(id);
  salesValidations.validId(result);
  return { status: OK_STATUS, result };
};

module.exports = { allSales, create, deleteService, getById, updateService };
