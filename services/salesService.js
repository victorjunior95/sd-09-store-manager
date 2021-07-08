const { ObjectID } = require('mongodb');
const SalesModel = require('../models/SalesModel');
const status = require('./statusCode');
const productsService = require('../services/productsService');

async function verifyIdAndQuantity(id, quantity) {
  try {
    const productId = ObjectID(id);
    const quantityProduct = Number(quantity);
    const productFound = await productsService.getOneProduct({_id: productId});
    if (!productFound) throw '';
    if (isNaN(quantityProduct)) throw '';
    if (quantityProduct <= 1) throw '';
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

async function putOneSale(itensSold) {
  try {
    return await SalesModel.addSale(itensSold);
  } catch (error) {
    return productsService.errorObj(error);
  }
};

module.exports = { 
  putOneSale,
  verifyProductsList,
};
