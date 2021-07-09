const Sales = require('../models/Sales');

const validateQuantity = (data) => {
  const result = data.every(({ quantity }) => {
    if (typeof quantity !== 'number') return false;
    if (quantity < 1) return false;
    return true;
  });
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }
  };
  return result;
};

const addNewSale = async (data) => {
  const salesQuantity = validateQuantity(data);
  if (salesQuantity.err) {
    return salesQuantity;
  }
  
  const newData = {
    itensSold: data.map((e) => e)
  };

  const sales = await Sales.addNewSale(newData);

  return sales;
};

const getAll = async () => {
  const sale = await Sales.getAll();
  return { sales: sale };
};

const getOne = async (id) => {
  const sale = await Sales.getOne(id);

  if (!sale) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  return sale;
};

module.exports = {
  addNewSale,
  getAll,
  getOne
};