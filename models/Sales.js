const connection = require('./connection');
const { ObjectId } = require('mongodb');

const newSale = async (sales) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => result.ops[0]);
};

module.exports = {
  newSale,
};
