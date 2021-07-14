const util = require('../model/util');
const salesModel = require('../model/salesModel');
const productService = require('../service/productService');

const minQuantity = 0;

const newSale = async (items) => {
  return Promise.all(
    items.map(async (item) => {
      const idFound = await productService.validateFoundId(item.productId);
      if (
        item.quantity <= minQuantity ||
        typeof item.quantity !== 'number' ||
        idFound.err
      ) throw {
        err: {
          message: 'Wrong product ID or invalid quantity',
          code: 'invalid_data'
        }
      };
    })
  ).then(() => salesModel.createSale(items));
};

const getAllSales = async () => {
  return await util.getAll('sales');
};

const findSale =  async (id) => {
  const sale = await salesModel.findSaleById(id);
  if (!sale) return {
    err: { 
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  return sale;
};

module.exports = { newSale, getAllSales, findSale };