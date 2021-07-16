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

module.exports = {
  registerSale,
  getSales
};
