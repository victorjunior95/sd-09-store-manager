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
  if (!sale) throw {
    err: { 
      code: 'not_found',
      message: 'Sale not found'
    }
  };
  if (sale === null) throw {
    err: { 
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  };
  return sale;
};

const saleUpdate = async (id, items) => {
  return Promise.all(
    items.map(async (item) => {
      await productService.validateFoundId(id);
      if ( item.quantity <= minQuantity || typeof item.quantity !== 'number' ) throw {
        err: {
          message: 'Wrong product ID or invalid quantity',
          code: 'invalid_data'
        }
      };
    })
  ).then(() => salesModel.updateSale(id, items));
};

const deleteSaleById = async (id) => {
  return await salesModel.deleteOneSale(id);
};

module.exports = { newSale, getAllSales, findSale, saleUpdate, deleteSaleById };