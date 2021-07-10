const salesModel = require('../models/salesModel');
const { salesValidator } = require('./validators');

const create = async (productsArray) => {
  if (await salesValidator(productsArray))
    return salesValidator(productsArray);

  return salesModel.create(productsArray);
};

const getAll = async () => {
  const allSales = await salesModel.getAll();

  // console.log('getAll =======================================================Inicio')
  // console.log('##### allSales')
  // console.log('#####', allSales)
  // console.log('##### allSales[0]')
  // console.log('#####', allSales[0])
  // console.log('##### allSales[0].itensSold')
  // console.log('#####', allSales[0].itensSold)
  // console.log('getAll =======================================================Fim')

  return { sales: allSales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  console.log('getById =================================================', sale);
  if (sale) return sale;

  return {
    err: {
      code: "not_found",
      message: "Sale not found",
    }
  }
};



module.exports = {
  create,
  getAll,
  getById,
};
