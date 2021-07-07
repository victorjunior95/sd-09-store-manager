const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (products) => {
  return connection()
    .then((db) => db.collection('sales').insertMany([{itensSold: [...products]}])
      .then((result) => result.ops[0]));
};

module.exports = {
  createSale,
};


