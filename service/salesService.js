const util = require('../model/util');
const { ObjectId } = require('mongodb');
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
  if(!ObjectId.isValid(id)) return null;
  return await salesModel.findSaleById(id);
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
  const sale = await salesModel.deleteOneSale(id);
  console.log(`service: ${sale}`);

  return sale;
};

module.exports = { newSale, getAllSales, findSale, saleUpdate, deleteSaleById };