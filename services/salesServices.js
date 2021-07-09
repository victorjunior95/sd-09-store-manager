const salesModel = require('../models/salesModels');
const { ObjectId } = require('mongodb');

module.exports = {
  validateSale: async (body) => {
    let error = false;

    body.forEach((sale) => {
      if (Number(sale.quantity) < 1 || typeof sale.quantity !== 'number') {
        error = true;
      }
    });

    if (error) {
      error = false;

      return {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong product ID or invalid quantity'
        }
      };
    }

    return await salesModel.addSales(body);
  },
};
