const SalesModels = require('../models/SalesModels');

const return_length = 0;


const create = async (sale) => {
  const newSale = await SalesModels.create(sale);

  if (!newSale) return {
    error: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
  };

  return newSale;
};

const getAll = async () => {
  const sale = await SalesModels.getAll();

  if (!sale) {
    return {
      error: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  }
  console.log(sale);

  return sale;
};

const findById = async (id) => {
  const sale = await SalesModels.findById(id);

  if (!sale) {
    return {
      error: {
        code: 'not_found',
        message: 'Sale not found'
      }
    };
  }

  return sale;
};

const updateOne = async (id, body) => {
  const sale = await SalesModels.updateOne(id, body);

  return sale;
};

const deleteOne = async (id) => {
  // const sale = await SalesModels.findById(id);
  
  const sale = await SalesModels.deleteOne(id);
  // console.log(sale);


  if (!sale) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    };
  }

  
  return sale;
};

module.exports = {
  create,
  getAll,
  findById,
  updateOne,
  deleteOne
};