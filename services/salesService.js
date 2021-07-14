const salesModel = require('../models/salesModel');
const validations = require('../schemas/SalesSchema');

const getSaleById = async (id) => {
  validations.validateSaleId(id);
  const sale = await salesModel.getSaleById(id);
  validations.validateSale(sale);
  return sale;
};

const insertSale = async (orders) => {
  validations.validateQuantity(orders);
  return await salesModel.insertSale(orders);
};

const updateSale = async (saleId, saleInfo) => {
  const { productId, quantity } = saleInfo[0];
  console.log(quantity);
  validations.validateSingleQuantity(quantity);

  return await salesModel.updateSale(saleId, productId, quantity);
};

const deleteSale = async (id) => {
  validations.validateDeleteId(id);
  return await salesModel.deleteSale(id);
};

module.exports = {
  insertSale,
  getSaleById,
  deleteSale,
  updateSale,
};
