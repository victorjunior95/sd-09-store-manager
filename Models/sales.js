const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function addSales(products) {
  const value = await connection()
    .then(db => db.collection('sales').insertOne(
      { itensSold: products }
    ));

  return value;
};

module.exports = {
  addSales,
};