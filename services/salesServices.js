const salesModel = require('../models/salesModels');
const { ObjectId } = require('mongodb');

module.exports = {
  validateSale: async (body) => {
    let error = false;

    body.forEach((sale) => {
      if (Number(sale.quantity) < 1 || typeof sale.quantity !== 'number') error = true;
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

  findAllSales: async () => {
    return await salesModel.listAllSales();
  },

  findSaleById: async (id) => {
    if (ObjectId.isValid(id)) {
      const finded = await salesModel.listSaleById(id);

      if (finded)  return finded;
    }

    return {
      'err': {
        'code': 'not_found',
        'message': 'Sale not found'
      }
    };
  },

  saleToUpdate: async (id, productId, quantity) => {
    if (!ObjectId.isValid(id)) return null;

    if (quantity < 1 || typeof quantity !== 'number') {
      return {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong product ID or invalid quantity'
        }
      };
    }

    return await salesModel.updateSale(id, productId, quantity);
  },

  saleToDelete: async (id) => {
    if (!ObjectId.isValid(id)) {
      return {
        'err': {
          'code': 'invalid_data',
          'message': 'Wrong sale ID format'
        }
      };
    }

    return await salesModel.deleteSale(id);
  },
};
