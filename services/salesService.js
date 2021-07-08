const { ObjectID } = require('mongodb');
const SalesModel = require('../models/SalesModel');
const status = require('./statusCode');

function errorObj(error) {
  const objectErr = { err: { code: '', message: '', status: ''}};
  objectErr.err.code = error.code;
  objectErr.err.message = error.message;
  objectErr.err.status = error.status;
  return objectErr;
}

async function putOneSale(arrayOfSoldProducts) {
  try {
    return await SalesModel.addSale(arrayOfSoldProducts);
  } catch (error) {
    return errorObj(error);
  }
};

module.exports = { 
  putOneSale,
};
