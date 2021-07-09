const { createNewSale } = require('../models/salesModels');
const { validateSaleQuantity } = require('./validations');

async function createSale(sale) {
  sale.forEach((item) => {
    validateSaleQuantity(item.quantity);
  });
  const result = await createNewSale(sale);
  return result;
}

module.exports = {
  createSale,
};
