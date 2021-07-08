const sale = require('../validations/sale');
const salesModel = require('../models/salesModel');

const postValidateOneSale = async (productId, quantity) => {
  if (!sale.quantityValueIsValid(quantity)
    || !sale.quantityTypeIsValid(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      status: 422,
    };
  }

  return await salesModel.postOneSaleIntoDb(productId, quantity);
};

const postValidateManySales = async (sales) => await salesModel
  .postManySalesIntoDb(sales);

module.exports = {
  postValidateOneSale,
  postValidateManySales,
};
