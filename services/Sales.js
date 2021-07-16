const Sales = require('../models/Sales');

const validateSaleQtts = (sale) => {
  sale.forEach((sale) => {
    if (sale.quantity < 1 || typeof sale.quantity !== 'number') {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        },
        status: 422,
      };
    }
  });
};

const newSale = async (sale) => {
  validateSaleQtts(sale);
  const addSale = await Sales.newSale(sale); 
  return {
    status: 200,
    addSale
  };
};
  
module.exports = {
  newSale,
};
