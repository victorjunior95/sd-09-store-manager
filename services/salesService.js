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
    const totalAmountInStock = productFound.quantity - quantityProduct;
    if (!productFound) throw '';
    if (isNaN(quantityProduct)) throw '';
    if (quantityProduct <= minQuantity) throw '';
    if (totalAmountInStock < minQuantity) throw '';
    await productsService.putOneProduct(productId, productFound.name, totalAmountInStock);
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
