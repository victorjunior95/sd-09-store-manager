const Sales = require('../models/Sales');

const validateQuantity = (data) => {
  const result = data.every(({ quantity }) => {
    if (typeof quantity !== 'number') return false;
    if (quantity < 1) return false;
    return true;
  });
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  };
  return result;
};

const addNewSale = async (data) => {
  const salesQuantity = validateQuantity(data);
  if (salesQuantity.err) {
    return salesQuantity;
  }

  const sales = await Sales.addNewSale(data);
  return sales;
};

module.exports = {
  addNewSale,
};