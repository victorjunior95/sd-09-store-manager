const listDBSales = require('../../models/sales/listSales');

const listSales = async () => {
  const sales = await listDBSales();
  return { sales };
};

module.exports = listSales;