const { createSales } = require('../models/salesModel');

const { validNumber, validQuantity } = require('./salesValidations');

const OK_STATUS = 200;

const create = async (newSales) => {
  validQuantity(newSales);
  validNumber(newSales);
  const result = await createSales(newSales);
  return { status: OK_STATUS, result };
};

module.exports = {
  create,
};
