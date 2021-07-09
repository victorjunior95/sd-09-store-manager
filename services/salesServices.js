const {
  salesRegister,
  getAllSales,
  getSaleById,
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

const checkId = (id) => {
  const regexId = /[0-9A-Fa-f]{6}/g;
  const bolean = regexId.test(id);
  if(!bolean) {
    throw [
      {
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      },
      {
        status: 404
      }
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

const checkIfProductExists = (product) => {
  if(!product) {
    throw [
      {
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      },
      {
        status: 404
      }
    ];
  }
};

const getAll = async () => {
  const result = await getAllSales();
  return result;
};

const getById = async (id) => {
  checkId(id);
  const result = await getSaleById(id);
  checkIfProductExists(result);
  return result;
};

module.exports = {
  register,
  getAll,
  getById,
};