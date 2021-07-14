const updateDBSale = require('../../models/sales/updateSale');
const verifySale = require('./verifySale');
const { invalidId } = require('../utils/errorMessages');


const updateSale = async (id, sales) => {
  const response = verifySale(sales);
  
  if(response) return response;

  try {
    const sale = await updateDBSale(id, sales);
    return sale;
  } catch (error) {
    return { code: 'invalid_data', message: invalidId };
  }
};

module.exports = updateSale;