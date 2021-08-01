const salesModel = require('../models/sales.model');

const saleVerification = ({ quantity }) => {
  if(quantity < 1 || typeof(quantity) === 'string') return {
    status: 422,
    data: {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    }
  };
};

const createSales = async (sales) => {
  let err;
  sales.forEach((sale) => {
    err = saleVerification(sale);
  });
  if(err) throw err;

  const createdSales = await salesModel.createSales(sales);
  return { status: 200, data: createdSales };
};

module.exports = {
  createSales,
};
