const Sales = require('../models/Sales');
const { ObjectId } = require('mongodb');

const quantitySize = 0;
const invalidData = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  }
};

const validateSales = (sale) => {

  const testSale = sale
    .every((i) => i.quantity > quantitySize && typeof i.quantity === 'number');

  if (!testSale) return invalidData;

};

const registerSales = async (sale) => {

  const data = validateSales(sale);

  if (data) return data;

  const sales = await Sales.registerSales(sale);


  return sales;
};

module.exports = {
  registerSales,
};
