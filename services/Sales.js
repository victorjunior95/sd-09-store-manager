const Sales = require('../models/Sales');
const { ObjectId } = require('mongodb');


const validateSale = (sale) => {
  sale.forEach((sale) => {
    if (sale.quantity < 1 || typeof sale.quantity !== 'number') {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity'
        },
        status: 422,
      };
    }
  });
};

const createNewSale = async (sale) => {
	 validateSale(sale); 
 	const newSale = await Sales.createNewSale(sale);
  if (!newSale) {
    throw {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell'
      },
      status: 404,
    };
  }
  return {
    status: 200,
    newSale
  };
};

const getAll = async () => {
  const sales = await Sales.getAll();
  return {
    status: 200,
    sales
  };
};

const checkSale = (sale) => {
  if (!sale) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      },
      status: 404,
    };
  }
};

const checkId = (id) => {
  if (!ObjectId.isValid(id)) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      },
      status: 422,
    };
  }
};

const findById = async (id) => {
	 const sale = await Sales.findById(id);
  checkSale(sale);
  return {
    status: 200,
    sale,
  };
};

const updateSale = async (id, sale) => {
  validateSale(sale);
  const updatedSale = await Sales.updateSale(id, sale);
  return {
    status: 200,
    updatedSale
  };
};

const deleteSale = async (id) => {
  checkId(id);
  const deletedSale = await Sales.deleteSale(id);
  checkSale(deletedSale);
  return {
    status: 200,
    deletedSale
  };
};

module.exports = {
  createNewSale,
	 getAll,
	 findById,
  updateSale,
  deleteSale,
};
