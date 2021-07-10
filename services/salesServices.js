const {
  salesRegister,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
} = require('../models/salesModel');

const ZERO = 0;

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

const checkDelete = (result) => {
  if(result === ZERO) {
    throw [
      {
        err: {
          code: 'not_found',
          message: 'Wrong sale ID format'
        }
      },
      {
        status: 422
      }
    ];
  }
};

const checkIdDelete = (id) => {
  const regexId = /[0-9A-Fa-f]{6}/g;
  const bolean = regexId.test(id);
  if(!bolean) {
    throw [
      {
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format'
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

const update = async (id, body) => {
  checkIfQuantityIsANumber(body[0].quantity);
  checkQuantity(body[0].quantity);
  const result = await updateSale(id, body);
  return result;
};

const removeSale = async (id) => {
  checkIdDelete(id);
  const result = await deleteSale(id);
  checkDelete(result.deletedCount);
  return result;
};

module.exports = {
  register,
  getAll,
  getById,
  update,
  removeSale,
};