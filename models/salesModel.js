const connection = require('./connection');
const ObjectId = require('mongodb');

const findAll = async () => {
  const sales = await connection().then((db) => db.collection('sales')
    .find().toArray());
  return sales;
};

const create = async (itensSold) => {
  const newSale = await connection().then((db) => db.collection('sales')
    .insertOne({ itensSold }));
  return newSale.ops[0];
};

module.exports = {
  findAll,
  create,
};