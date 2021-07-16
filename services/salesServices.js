const salesModel = require('../models/salesModel');

const errorObject = (code, message) => ({'err': {'code':code, 'message': message}});

const MIN_SALES_QUANTITIES = 0;

const registerSale = async (sale) => {
  const isAllQuantitiesMoreThanZero = sale
    .find(product => product.quantity > MIN_SALES_QUANTITIES);

  const isAllQuantitiesNumber = sale
    .every(product => typeof product.quantity === 'number');

  if(!isAllQuantitiesMoreThanZero || !isAllQuantitiesNumber){
    const code = 'invalid_data';
    const message = 'Wrong product ID or invalid quantity';
    return {message: errorObject(code, message), status: 422};
  }

  // verifica se todos os produtos existem
  const salesRegistered = await salesModel.registerSale(sale);
  return {message: salesRegistered, status: 200};
};

const getSales = async () => {
  const sales = await salesModel.getSales();
  return {message: {'sales': sales}, status: 200};
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if(!sale){
    const code = 'not_found';
    const message = 'Sale not found';
    return {message: errorObject(code, message), status: 404};
  }
  return {message: sale, status: 200};
};

const updateSaleById = async (id, newData) => {
  if(newData.quantity <= MIN_SALES_QUANTITIES || typeof newData.quantity !== 'number'){
    const code = 'invalid_data';
    const message = 'Wrong product ID or invalid quantity';
    return {message: errorObject(code, message), status: 422};
  }
  const updatedSale = await salesModel.updateSaleById(id, newData);
  return {message: updatedSale, status: 200};
};

const deleteSaleById = async (id) => {
  const deletedSale = await salesModel.deleteSaleById(id);
  if(!deletedSale){
    const code = 'invalid_data';
    const message = 'Wrong sale ID format';
    return {message: errorObject(code, message), status: 422};
  }
  return {message: deletedSale, status: 200};
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
  updateSaleById,
  deleteSaleById
};
