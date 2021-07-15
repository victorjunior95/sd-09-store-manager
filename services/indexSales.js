const {
  allSalesService,
  findSale,
  registerSales,
  deleteSale,
  updateSale,
} = require('./getSalesService');
const {
  verifyQuantityArray,
} = require('./saleFormatValidator');

module.exports = {
  allSalesService,
  findSale,
  registerSales,
  deleteSale,
  updateSale,
  verifyQuantityArray,
};
