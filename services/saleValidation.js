const sale = require('../validations/sale');
const salesModel = require('../models/salesModel');
const { ObjectId } = require('mongodb');

const postValidateOneSale = async (productId, quantity) => {
  if (!sale.quantityValueIsValid(quantity)
    || !sale.quantityTypeIsValid(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      status: 422,
    };
  }

  return await salesModel.postOneSaleIntoDb(productId, quantity);
};

const postValidateManySales = async (sales) => await salesModel
  .postManySalesIntoDb(sales);

const getAllSales = async () => {
  const allSales = await salesModel.getAllSalesFromDb();

  return allSales;
};

const getSaleById = async (id) => {
  if (!sale.idIsValid(id)) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
      status: 404,
    };
  }

  const saleExists = await salesModel.getSaleFromDb(id);

  if (!saleExists) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
      status: 404,
    };
  }

  return await salesModel.getSaleFromDb(id);
};

const updateSale = async (id, quantity) => {
  if (!sale.quantityValueIsValid(quantity)
  || !sale.quantityTypeIsValid(quantity)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
      status: 422,
    };
  }

  return salesModel.updateSale(id, quantity);
};

const deleteSale = async (id) => {
  if (!sale.idIsValid(id)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
      status: 422,
    };
  }

  // if (!sale.idIsValid(id)) {
  //   return {
  //     err: {
  //       code: 'invalid_data',
  //       message: 'Wrong sale ID format',
  //     },
  //     status: 422,
  //   };
  // }

  return await salesModel.deleteFromDb(id);
};

module.exports = {
  postValidateOneSale,
  postValidateManySales,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
