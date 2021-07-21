const { createSalesModel } = require('../models/sales');
const joi = require('joi');

//Criar as verificações para o requisito 5.

const createSales = async (salesData) => {
  const create = await createSalesModel(salesData);
  return create;
};

module.exports = {
  createSales,
};
