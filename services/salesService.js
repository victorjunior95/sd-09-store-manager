const salesModel = require('../models/salesModel');

const MIN_PRODUCT_AMOUNT = 0;

const chekSalesQuantity = (quantity) => {
  if(quantity <= MIN_PRODUCT_AMOUNT || typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  }

  /* if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  } */
};

const registerSales = async (productId, quantity) => {
  if (chekSalesQuantity(quantity)) return chekSalesQuantity(quantity);
  const newSales = await salesModel.registerSales(productId, quantity);

  return newSales;
};

const getAllSalesService = async () => {
  const allSales = await salesModel.getAllSalesModel();

  return allSales;
};

const getSalesIdService = async (id) => {
  const salesId = await salesModel.getSalesIdModel(id);

  return salesId;
};

module.exports = {
  registerSales,
  getAllSalesService,
  getSalesIdService,
};
