const {
  salesRegister,
} = require('../models/salesModel');

const register = async (sales) => {
  sales.map((sale) => {
    checkQuantity(sale.quantity);
    checkIfQuantityIsANumber(sale.quantity);
  });
  const registeredSales = await salesRegister(sales);
  return registeredSales;
};

const checkQuantity = (quantity) => {
  const minumumQuantity = 0;
  if(quantity <= minumumQuantity) {
    throw [
      {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      },
      {
        status: 422
      },
    ];
  }
};

const checkIfQuantityIsANumber = (quantity) => {
  if(typeof quantity !== 'number') {
    throw [
      {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        }
      },
      {
        status: 422
      }
    ];
  }
};


module.exports = {
  register,
};