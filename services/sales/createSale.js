const updateProducts = require('../utils/updateProducts');
const addSales = require('../../models/sales/addSales');
const verifySale = require('./verifySale');

const createSale = async (sales) => {
  const ZERO = 0;
  let response = verifySale(sales);
  if(response) return response;

  const product = await updateProducts(sales[0]);
  console.log(product);
  if(product) return product;

  const inserted = await addSales(sales);
  return inserted;
};

module.exports = createSale;