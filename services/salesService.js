const salesModel = require('../models/salesModel');

const MIN_PRODUCT_AMOUNT = 0;

const chekQuantity = (quantity) => {
  if(quantity <= MIN_PRODUCT_AMOUNT) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }
};

const registerSales = async (productId, quantity) => {
  if (chekQuantity(quantity)) return chekQuantity(quantity);
  const newSales = await salesModel.registerSales(productId, quantity);

  return newSales;
};

module.exports = {
  registerSales,
};
