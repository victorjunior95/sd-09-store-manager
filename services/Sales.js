const Sales = require('../models/Sales');

const validateSaleQtts = (sale) => {
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

const getAll = async () => {
  const sales = await Sales.getAll();
  console.log(sales);
  return {
    status: 200,
    sales
  };
};

const findById = async (id) => {
  const sale = await Sales.findById(id);
  checkSale(sale);
  return {
    status: 200,
    sale
  };
};


const newSale = async (sale) => {
  validateSaleQtts(sale);
  const addSale = await Sales.newSale(sale); 
  return {
    status: 200,
    addSale
  };
};

const updateSale = async (saleId, sale) => {
  validateSaleQtts(sale);
  const updatedSale = await Sales.updateSale(saleId, sale);
  return {
    status: 200,
    updatedSale
  };
};
  
module.exports = {
  getAll,
  findById,
  newSale,
  updateSale,
};
