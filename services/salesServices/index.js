const salesModules = require('../../models/Sales');
const validateQuantity = require('../salesServices/validateQuantity');

const insertOneSale = async (productsSold) => {
  const validateQuantityErr = validateQuantity(productsSold);
  if (validateQuantityErr) return validateQuantityErr;
  const insertedOneSale = await salesModules.insertOneSale(productsSold);
  return insertedOneSale;
};

module.exports = {
  insertOneSale
};
