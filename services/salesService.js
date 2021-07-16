const salesModel = require('../models/salesModels');

const registerSales = (sales) => {
  return salesModel.registerSales(sales);
};

module.exports = {
  registerSales,

};
