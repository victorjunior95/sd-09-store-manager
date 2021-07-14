const connection = require('./connection');
const { ObjectId } = require('mongodb');

const registerSales = (sale) => connection()
  .then((db) => db.collection('sales').insertOne({itensSold: sale}))
  .then(result => result.ops[0]);

module.exports = {
  registerSales,
};
