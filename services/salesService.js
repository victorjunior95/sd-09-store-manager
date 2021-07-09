const { ObjectID } = require('mongodb');
const SalesModel = require('../models/SalesModel');
const status = require('./statusCode');
const productsService = require('../services/productsService');

function verifyQuantities(saleQuantity, productQuantity) {
  const errorObj1 = { err: {
    status: status.unprocessableEntity,
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  }};
  const errorObj2 = { err: {
    status: status.notFound,
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell'
  }};
  const minQuantity = 0;
  const totalAmountInStock = productQuantity - saleQuantity;
  if (!productQuantity) return errorObj1;
  if (isNaN(saleQuantity)) return errorObj1;
  if (saleQuantity <= minQuantity) return errorObj1;
  if (totalAmountInStock < minQuantity) return errorObj2;
  return false;
}


async function verifyIdAndQuantity(id, quantity) {
  try {
    const minQuantity = 0;
    const productId = ObjectID(id);
    const quantitySale = Number(quantity);
    const productFound = await productsService.getOneProduct({_id: productId});
    const productQuantity = Number(productFound.quantity);
    const totalAmountInStock = productQuantity - quantitySale;
    const verifyquantities = verifyQuantities(quantitySale, productQuantity);
    if (verifyquantities) throw verifyquantities;
    await productsService.putOneProduct(productId, productFound.name, totalAmountInStock);
    return {};
  } catch (error) {
    return error;
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
    return validSaleId;
  } catch (error) {
    return { err: {
      status: status.notFound,
      code: 'not_found',
      message: 'Sale not found'
    }};
  }
}

function validateSaleId(id) {
  try {
    const validSaleId = ObjectID(id);
    return validSaleId;
  } catch (error) {
    return { err: {
      status: status.unprocessableEntity,
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }};
  }
}

async function postOneSale(itensSold) {
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
    return await SalesModel.findOneSale(id);
  } catch (error) {
    return productsService.errorObj(error);
  } 
}

async function putOneSale(idSale, productsList) {
  try {
    const startIndex = 0;
    let data;
    for (let index = startIndex; index < productsList.length; index += 1) {
      const productId = productsList[index].productId;
      const productQuantity = productsList[index].quantity;
      data = await SalesModel.updateOneSale(idSale, productId, productQuantity);
      if (data.err) { return data; }
    }

    return await SalesModel.findOneSale(idSale);
  } catch (error) {
    return productsService.errorObj(error);
  }
};

async function deleteOneSale(saleId) {
  try {
    const minQuantity = 0;
    const sale = await SalesModel.findOneSale(saleId);
    for (let index = minQuantity; index < sale.itensSold.length; index += 1) {
      const saleProductId = ObjectID(sale.itensSold[index].productId);
      const saleQuantity = sale.itensSold[index].quantity;
      const { name, quantity } = await productsService
        .getOneProduct({_id: saleProductId});
      await productsService.putOneProduct(saleProductId, name, quantity + saleQuantity);
    }
    return await SalesModel.excludeSale(saleId);
  } catch (error) {
    return productsService.errorObj(error);
  }
}

module.exports = { 
  postOneSale,
  putOneSale,
  verifyProductsList,
  validateAndFindSaleId,
  validateSaleId,
  getAllSales,
  getOneSale,
  deleteOneSale,
};
