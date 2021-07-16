const model = require('../models/Sales');

function saleValidation(sale) {
  sale.forEach((sale) => {
    if (sale.quantity < 1 || typeof sale.quantity !== 'number') {
      throw {
        status: 422,
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      };
    }
  });
}

async function newSale(sale) {
  saleValidation(sale);
  const result = await model.newSale(sale);
  return { status: 200, result };
}

module.exports = {
  newSale,
};
