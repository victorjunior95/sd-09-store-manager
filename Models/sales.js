const connection = require('./connection');
const { ObjectId } = require('mongodb');

async function addSales(products) {
  const value = await connection()
    .then(db => db.collection('sales').insertOne(
      { itensSold: products }
    ));

  return value;
};

async function findSales() {
  const value = await connection()
    .then(db => db.collection('sales').find().toArray());

  return value;
};

async function findSalesId(id) {
  const value = await connection()
    .then(db => db.collection('sales').findOne(new ObjectId(id)));

  return value;
};


module.exports = {
  addSales,
  findSales,
  findSalesId
};