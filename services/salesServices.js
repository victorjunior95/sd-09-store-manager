const salesModel = require('../models/salesModel');

const productsModel = require('../models/productsModel');
const productsService = require('../services/productsServices');

const postNewSale = async (array) => {

  const stock = await productsService.checkStock(array);

  if(stock.err) return stock;

  await productsModel.updateProductWhenSold(array);

  const result = await salesModel.postNewSale(array);

  return result;
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return result;
};

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);

  if (!result) return ({
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  });

  return result;
};

const updateSale = async ({ id, itensSold }) => {
  const result = await salesModel.updateSale({ id, itensSold });

  return result;
};

const deleteSale = async (id) => {
  const result = await salesModel.deleteSale(id);

  if(!result) return({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  });

  await productsModel.updateProductsWhenDeleted(result.itensSold);

  return result;
};

module.exports = {
  postNewSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
