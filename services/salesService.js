const { ObjectID } = require('mongodb');
const SalesModel = require('../models/SalesModel');
const status = require('./statusCode');
const productsService = require('../services/productsService');

async function verifyIdAndQuantity(id, quantity) {
  try {
    const minQuantity = 0;
    const productId = ObjectID(id);
    const quantityProduct = Number(quantity);
    const productFound = await productsService.getOneProduct({_id: productId});
    if (!productFound) throw '';
    if (isNaN(quantityProduct)) throw '';
    if (quantityProduct <= minQuantity) throw '';
    return {};
  } catch (error) {
    return { err: {
      status: status.unprocessableEntity,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity'
    }};
  }
}

async function verifyProductsList(productsList) {
  try {
    const startIndex = 0;
    let data;
    for (let index = startIndex; index < productsList.length; index += 1) {
      const productId = productsList[index].productId;
      const productQuantity = productsList[index].quantity;
      data = await verifyIdAndQuantity(productId, productQuantity);
      if (data.err) { return data; }

    }
    return {};
  } catch (error) {
    return productsService.errorObj(error);
  }
}

async function validateAndFindSaleId(id) {
  try {
    const validSaleId = ObjectID(id);
    const sale = await SalesModel.findOneSale(validSaleId);
    if (!sale) throw '';
    return sale;
  } catch (error) {
    return { err: {
      status: status.notFound,
      code: 'not_found',
      message: 'Sale not found'
    }};
  }
}

async function putOneSale(itensSold) {
  try {
    return await SalesModel.addSale(itensSold);
  } catch (error) {
    return productsService.errorObj(error);
  }
};

async function getAllSales() {
  try {
    const sales = await SalesModel.findAllSales();
    return { sales };
  } catch (error) {
    return productsService.errorObj(error);
  }
}

async function getOneSale(id) {
  try {
    return await validateAndFindSaleId(id);
  } catch (error) {
    return productsService.errorObj(error);
  } 
}

module.exports = { 
  putOneSale,
  verifyProductsList,
  getAllSales,
  getOneSale,
};
