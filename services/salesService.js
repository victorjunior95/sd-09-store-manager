const salesModel = require('../models/salesModel');
const validateSaleQuantity = require('../schemas/validateSaleQuantity');

const addSales = async (body) => {
  const validate = validateSaleQuantity(body);
  if (validate.err) return validate;

  const result = await salesModel.addSales(body);

  return result;
};

const getSales = async () => {
  const result = await salesModel.getSales();

  return result;
};

const getSalesById = async (id) => {
  const result = await salesModel.getSalesById(id);
  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  return result;
};

const updateSaleById = async (id, body) => {
  const { productId, quantity } = body[0];

  const checkQuant = validateSaleQuantity(body);
  if (checkQuant.err) return checkQuant;

  const data = await salesModel.updateSaleById(id, productId, quantity);

  if (!data) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  return data;
};

const deleteSaleById = async (id) => {
  const data = await salesModel.deleteSaleById(id);

  if (!data) return { err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format'
  }};

  return data;
};

module.exports = {
  addSales,
  getSales,
  getSalesById,
  updateSaleById,
  deleteSaleById,
};
