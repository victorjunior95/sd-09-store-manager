const Products = require('../models/Products');
const Sales = require('../models/Sales');

const create = async (array) => {
  return Sales.create(array);
};

const getAll = async () => await Sales.getAll();

const findById = async (id) => {
  const sales = await Sales.findById(id);

  if (!sales) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
      code: 404,
    };
  }

  return sales;
};

module.exports = {
  create,
  getAll,
  findById,
};
