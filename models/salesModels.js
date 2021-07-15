const connection = require('./connection');
const { ObjectId } = require('mongodb');

const insertSales = async (arrayToInsert) => {
  return await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: arrayToInsert }))
    .then((res) => res.ops[0]);
};

const getAllSales = async () => {
  return await connection()
    .then((db) => db.collection('sales').find({}).toArray());
};

module.exports = {
  insertSales,
  getAllSales,
};
