const findDBSale = require('../../models/sales/findSales');
const { notFoundSale } = require('../utils/errorMessages');

const findSale = async (id) => {
  try {
    const sale = await findDBSale(id);
    if(!sale) return { code: 'not_found', message: notFoundSale };
    return sale;
  } catch (error) {
    return { code: 'not_found', message: notFoundSale };
  }
};

module.exports = findSale;